---
authors: ["alex"]
comments: true
date: "2017-07-11"
draft: false
share: true
categories: [English, Docker, Linux]
title: "Run Windows application on Ubuntu using Docker"
twitterImage: "/images/run-windows-application-on-ubuntu-using-docker/docker_windows.png"

languageCode: "en-EN"
type: "post"
toc: false

---

Run Windows applications on Linux has always been tedious and boring. Hours and hours to run a simple notepad! This is bad.
Fortunately thanks to Docker, we can do somebody else's work and have an already configured environment to run our Windows applications on Ubuntu.

**-- Disclaimer: Using Windows applications on linux can be harmful to your health. Do not abuse it and be careful! --**

Docker is one of the software most used by DevOps and cloud gurus to recreate identical environments on different machines.

Docker provides an additional layer of abstraction of Linux containers (LXC).

> LXC (Linux Containers) is an operating-level-level virtualization method for running multiple isolated Linux systems on a control host using a single Linux kernel. * - Wikipedia *

An overview of Wine:

> Wine (recursive acronym for Wine Is Not an Emulator) is a free and open-source compatibility layer that aims to allow computer programs (application software and computer games) developed for Microsoft Windows to run on Unix-like operating systems. * - Wikipedia *

## What we do today?

Today we try to run a Windows GUI application (such as Firefox, Spotify or Skype) on Ubuntu using Docker.

## Under the wood

To run Windows application on Linux we usually need download, install and configure [Wine](https://www.winehq.org/).
In this tutorial we also use wine but it's preconfigured in a docker image ready-to-use.
We need also an XServer, Ubuntu has one preinstalled, so we'll connect it to our container to use the host server as a rendering engine.

### What we need?

- Ubuntu
- Docker

## Installation

To install docker follow this tutorial: [Install Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)

## Let's start in the easiest way!

Open a terminal window, paste this snippet and voilà:

```sh
docker run --rm -it \
    -v /tmp/.X11-unix:/tmp/.X11-unix  \
    -e DISPLAY=$DISPLAY \
    --name wine-notepad \
    alexmanno/wine wine notepad.exe
```

It will pull from docker hub the ```alexmanno/wine``` image and run the Windows's notepad.exe application.

## Conclusion

Our tests show that most portable applications downloaded from [PortableApps](https://portableapps.com/) work properly with this method, though with obvious performance dropouts.

## Tips and tricks

If you have a MacOS system you can do it anyway, but you need to install [xQuartz](https://www.xquartz.org/) to have an X Server like the Ubuntu's X.Org




