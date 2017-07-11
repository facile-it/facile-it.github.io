---
authors: ["alex"]
comments: true
date: "2017-07-11"
draft: false
share: true
categories: [English, Docker, Linux]
title: "Run Windows apps on Ubuntu using Docker"
twitterImage: "/images/run-windows-apps-on-ubuntu-using-docker/docker_windows.png"

languageCode: "en-EN"
type: "post"
toc: false

---

Running Windows apps on Linux has always been a tedious process: hours and hours to run a simple notepad! This is bad.
Fortunately, thanks to Docker, we can take advantage of someone else's effort with an already configured environment to run our Windows apps on Ubuntu.

> **Disclaimer: using Windows apps on linux can be harmful to your health. Do not abuse it and be careful!**

Docker is one of most used softwares by DevOps and cloud gurus to generate identical environments on different machines, by providing an additional layer of abstraction on top of Linux containers (LXC):

> LXC (Linux Containers) is an operating-level-level virtualization method for running multiple isolated Linux systems on a control host using a single Linux kernel. - [Wikipedia](https://en.wikipedia.org/wiki/LXC)

An overview of [Wine](https://www.winehq.org/) (MEGLIO SPIEGARE IN DUE PAROLE COS'È WINE, E LINKARE SUBITO IL SITO):

> Wine (recursive acronym for Wine Is Not an Emulator) is a free and open-source compatibility layer that aims to allow computer programs (app software and computer games) developed for Microsoft Windows to run on Unix-like operating systems. - [Wikipedia](https://en.wikipedia.org/wiki/Wine_(software))

We're going to try and run a Windows GUI app (such as Firefox, Spotify or Skype) on Ubuntu by leveraging Docker and Wine.

## Under the hood

To run Windows apps on Linux we usually need to download, install and configure Wine: the main goal of this article will be to write a ready-to-use docker image with a preconfigured environment for running Wine. We'll also need an [X server](https://www.x.org/wiki/) as rendering engine, but Ubuntu has one preinstalled so we'll simply connect the host server to our Docker container.

Thus, the main ingredients will be:

- Ubuntu
- Docker

To install Docker on your Ubuntu machine you can follow [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04).

## TL;DR

In the end we'll be able to run, e.g., Notepad by just copying and pasting this snippet in a terminal window:

```sh
docker run --rm -it \
    -v /tmp/.X11-unix:/tmp/.X11-unix  \
    -e DISPLAY=$DISPLAY \
    --name wine-notepad \
    alexmanno/wine wine notepad.exe
```

Docker will pull the `alexmanno/wine` image from [Docker Hub](https://hub.docker.com), and run the Windows notepad.exe app.

PARAGRAFO IN CUI SI SPIEGA IL PROCESSO STEP-BY-STEP

## macOS

If you have a macOS system you can still use Docker to run Windows apps, but you need to install [XQuartz](https://www.xquartz.org/) to have an X Windows System running like on Ubuntu.

## Conclusion

(QUALI TEST?)
Our tests show that most portable apps downloaded from [PortableApps](https://portableapps.com/) work properly with this method, even if with obvious performance drops.
(È UN PO' SCARNA COME CONCLUSIONE, SE NON C'È ALTRO DA SCRIVERE È MEGLIO INCORPORARE QUESTO PARAGRAFO IN UNO DEI PRECEDENTI)