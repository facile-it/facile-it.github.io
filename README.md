# Facile.it Engineering Blog

This is the repo behind [https://engineering.facile.it/](https://engineering.facile.it/).

## Cloning instructions

```bash
git clone --recursive git@github.com:facile-it/facile-it.github.io.git
```

The `--recursive` option is due to the fact that [the theme is forked](https://github.com/facile-it/hugo-future-imperfect) and included as a Git submodule.

## Usage

 * No need to install anything, Hugo binaries are committed in the repo (for Linux and OSX, both x64)
 * To serve the site locally (with drafts enabled):

```bash
./hugo server -D
```
or, if you are on Windows:

```bash
bin\hugo.exe server -D
```

 * To update the theme 
 
```bash
git submodule update
git add themes
git commit [...] # to save it it
```

 * To deploy your current workspace to the blog:
 
```bash
./deploy
```

## Front matter documentation

`authors`: an array of the authors of the article; the names must match the `.yml` files in the `/data/authors` folder;

`comments`: enables Disqus at the end of the page (disabled anyway when serving locally);

`date`: the supposed date of publishing;

`draft`: to enable a draft status, which will block the article from being published during a deploy;

`share`: if true, enables the social sharing buttons;

`categories`: the categories where the article will be listed under; watch out for caps matching, and add always the language category;

`title`: the title of the article;

`description`: a quick description of the article content. Will be used in the homepage, as a subtitle, and in Facebook and X (Twitter) sharing; 

`languageCode`: suggested, not needed, default is "en-En";

`type`: always "post" for articles;

`aliases`: an array of URLS which will redirect to this page; used for the transition from the old site;

`ita` or `eng`: the file name of the article of the opposite language, to obtain cross-linking between translations;

`image`: used for sharing the URL on Facebook and LinkedIn. Best fit: 1600px x 900px. If not specified, the [ENGR logo](./static/images/social/social-preview.png) will be used;

`twitterImage`: used for the Twitter cards when sharing the URL of this page of this page on X (formerly Twitter), Telegram, Slack, and WhatsApp; you can use the same image as the `image` parameter. If not specified, the [ENGR logo](./static/images/social/social-preview.png) will be used;

## Hints on how to write post

The hints are listed [in this article](./how-to-write-posts.md).

