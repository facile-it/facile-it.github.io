# Social sharing preview

Letting someone know that you have written something new is almost as important as writing a new post itself.

Here are some hints for making the posts easier to share on social media.

## title

In the front matter on top of the article, insert a `title` property. Keep the title short for the sake of sharing. I suggest a maximum of five words since longer titles hide the description when shared on Facebook.

## Description

Insert a `description` tag. Keep the description short since it will be used as the post description when sharing on Facebook (cropped version) and X.

## Social sharing image

Add an image to the repository. Ensure the image fits the content of the post since it is used as a preview when sharing on social media. The best dimensions are 1600px x 900px. If you do not specify any image, [the default one is used](static/images/social/social-preview.png). If in doubt, you can use [default images](static/images/social/suggested/2.png).

Custom twitter image should be **linked on top of the article**, as a `twitterImage` prop, as long as an `image` prop. Both are used in different social media and messaging apps.

## Size and borders

Previews on Facebook, LinkedIn, and X are different in size and, therefore, slightly cropped along the borders. Do not insert important information close to the border.

## Social media platform-specific hints
Here are some hints on how to achieve the best results on each social media platform.

### Facebook
Use a short title (three or four words) and a short description to avoid cropping.

### LinkedIn
No description is shown.

### Messaging apps
Telegram, Slack, and Whatsapp use Twitter information.

## SEO hints

We're working on [automatizing this part](https://github.com/facile-it/facile-it.github.io/issues/73). 
In the meantime, you should use a JSON+LD script.

### JSON-LD
JSON-LD enables Google crawlers to retrieve and index the content of the post. Therefore, the better the JSON-LD data, the greater the visibility.

### Add a JSON-LD object
In a tag script, add a [JSON+LD](https://json-ld.org/) object to the page and fill it in with information about the post. For inspiration, seèe [this page](content/blog/eng/v-protetto8-9-2023.md).

### JSON-LS object format

`@context`: "https://schema.org", 

`@type`: "BlogPosting",

`publisher`: "Facile.it Engineering",

`url`: "https://engineering.facile.it/",

`headline`: title of your article;

`keywords`: some keyword regarding your post. Please add programming language, if used;

`wordcount`: use some tool too estimate it

`datePublished`: self-explanatory, use format yyyy-mm-dd;

`dateCreated`: self-explanatory, use format yyyy-mm-dd;

`dateModified`: self-explanatory, use format yyyy-mm-dd;

`description`: add a short description of the article, like a subtitle.

`articleBody`: deprecated (should be crawled automatically by bot)

`author`: please look at the proper format to use
