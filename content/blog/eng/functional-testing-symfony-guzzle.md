---
authors: ["carlo cappai"]
comments: true
date: "2021-04-06"
draft: true
share: true
categories: [English, PHP, Testing, Symfony, Guzzle]
title: "How to write a functional test with Symfony and Guzzle's mock handler"
languageCode: "en-EN"
type: "post"
twitterImage: ''
toc: true
---

# Introduction

When we write a client to integrate an API in our systems it is important to test it to be sure we can handle every possible response.
Guzzle client provides a very simple way to mock external APIs responses: Guzzle Mock Handler. This tool provides a mock handler 
that can be used to fulfill HTTP requests with a response or exception by shifting return values off of a queue.

How does it work? Here’s an example provided by Guzzle documentation (https://docs.guzzlephp.org/en/stable/).

```php
<?php

use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;

// Create a mock and queue two responses.
$mock = new MockHandler([
    new Response(200, ['X-Foo' => 'Bar']),
    new Response(202, ['Content-Length' => 0]),
    new RequestException("Error Communicating with Server", new Request('GET', 'test'))
]);

$handler = HandlerStack::create($mock);
$client = new Client(['handler' => $handler]);

// The first request is intercepted with the first response.
echo $client->request('GET', '/')->getStatusCode();
//> 200
// The second request is intercepted with the second response.
echo $client->request('GET', '/')->getStatusCode();
//> 202
```

# A real use case
But how can we test our effective Symfony controller 
that has to handle all the responses? 
Let's suppose we have a controller that returns a JsonResponse with a different message and status code based on what 
it gets from the APIs

```php
<?php

use Symfony\Component\HttpFoundation\JsonResponse;
use MyNamespace\MyApiClient;

public function apiControllerAction(MyApiClient $client)
    {
     
      $response = $client->getFoo();

      if($response->getStatusCode()===200){
            return new JsonResponse(
                [
                    'status'=>'ok',
                    'message' => $response->getBody()
                ],
                 200
            );
        }

        if($response->getStatusCode()===404){
            return new JsonResponse(
                [
                   'status' => 'error',
                   'message' => 'foo not found'
                ],
                 404
            );
        }

        return new JsonResponse(
            [
                'status'=>'error',
                'message' => 'something went wrong'
            ],
            500
        );

    }
```

MyApiClient has a constructor that initialize the HTTP client and a method who retrieves "foo" from the API.

```php
<?php

namespace MyNamespace;
use Psr\Http\Client\ClientInterface;

class MyApiClient
{
    public function __construct(ClientInterface $client)
    {
        $this->client = $client;
    }

    public function getFoo()
    {
        return $this->get('https://api-url/foo');
    }

}
```

Symfony will automatically inject MyApiClient in our controller, but to make sure 
it will inject ClientInterface in MyApiClient we have to modify services.yaml to 
look like this:

```yaml
Psr\Http\Client\ClientInterface: '@psr18.client'

  psr18.client:
    class: GuzzleHttp\Client
```

This way we are telling Symfony to inject Guzzle HTTP Client in MyApiClient.

# Road to testing
Now we have to create the functional test for our controller. The test will expect 3 different responses according to API responses.
But before creating our test however, a preliminary step is needed. We have to create a class that extends Guzzle in order to easily manage the mock responses.  
It will look like this:

```php
<?php

namespace Tests\Fake;

use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Client;

/**
 * Class ClientFake
 */
class ClientFake extends Client
{
    /** @var MockHandler */
    protected $mockHandler;

    /**
     * ClientFake constructor.
     */
    public function __construct()
    {
        $this->mockHandler = new MockHandler();
        $handler = HandlerStack::create($this->mockHandler);
        parent::__construct(['handler' => $handler]);
    }

    /**
     * @param $responses
     */
    public function appendResponse($responses): void
    {
        $this->mockHandler->append(...$responses);
    }
}
```

This is not enough yet. We have to tell Symfony to use our `ClientFake` instead of
GuzzleHttp\Client when we are running our test. So we open our services_test.yml and we add following lines:

```yaml
psr18.client:
    public: true
    class: Tests\Fake\ClientFake
```

When we are running our tests, Symfony will inject ClientFake in MyApiClient instead of real GuzzleClient. 
Are we ready to write our test now?
Almost! We have to write a test case to initialize all the stuff we need.

```php
<?php

namespace Test;
use Symfony\Bundle\FrameworkBundle\Client;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class MockHandlerTestCase extends WebTestCase
{
    /**
     * @var Tests\Fake\ClientFake
     */
    protected $clientInterface;

    /** @var Client */
    protected $client;

    /** @var \Symfony\Component\DependencyInjection\ContainerInterface|null */
    protected $Container;

    public function __construct(?string $name = null, array $data = [], string $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
        $this->client = static::createClient();
        $this->Container = $this->client->getContainer();
        $this->clientInterface = $this->Container->get('psr18.client');
    }

    protected function prepareMock($response)
    {
        $this->clientInterface->appendResponse([$response]);
    }
}
```

# Tests
And now we can finally write our tests. 

##Test 1
In the first one we simulate that APIs returns us a 200 code with a simple body.
```php
<?php

use Tests\MockHandlerTestCase;
use GuzzleHttp\Psr7\Response as ClientResponse;
use Symfony\Component\HttpFoundation\Response;

class apiControllerTest extends MockHandlerTestCase
{
    public function __construct($name = null, array $data = [], $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
    }

    public function testOK(): void
    {
        //we set up our API mock response
        $response200 = new ClientResponse(Response::HTTP_OK, [], json_encode(['foo'=>'bar']));
        $this->prepareMock($response200);

        //we navigate to our route
        $this->client->request('GET', '/routeToApiController');

        //we expect a 200 (from controller - not from api)
        $this->assertEquals(200, $this->client->getResponse()->getStatusCode());

        //we put controller's response in a variable
        $result = \json_decode($this->client->getResponse()->getContent(), true);

        //we check that controller give us what we expect
        $this->assertEquals('ok', $result['status']);
    }

}
```

##Test 2
It will test a 404 response.

```php
<?php

public function testNotFound(): void
{
    //we set up our API mock response
    $response404 = new ClientResponse(Response::HTTP_NOT_FOUND);
    $this->prepareMock($response404);

    //we navigate to our route
    $this->client->request('GET', '/routeToApiController');

    //we expect a 404 (from controller - not from api)
    $this->assertEquals(404, $this->client->getResponse()->getStatusCode());

    //we put controller's response in a variable
    $result = \json_decode($this->client->getResponse()->getContent(), true);

    //we check that controller give us what we expect
    $this->assertEquals('error', $result['status']);
}
```
##Test 3
In the last one we simulate a 500 answer.
```php
<?php

public function testGenericError(): void
{
    //we set up our API mock response
    $response500 = new ClientResponse(Response::HTTP_INTERNAL_SERVER_ERROR);
    $this->prepareMock($response500);

    //we navigate to our route
    $this->client->request('GET', '/routeToApiController');

    //we expect a 500 (from controller - not from api)
    $this->assertEquals(500, $this->client->getResponse()->getStatusCode());

    //we put controller's response in a variable
    $result = \json_decode($this->client->getResponse()->getContent(), true);

    //we check that controller give us what we expect
    $this->assertEquals('error', $result['status']);
    $this->assertEquals('something went wrong', $result['message']);
}
```

That’s all folks!