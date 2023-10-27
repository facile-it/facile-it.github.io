## Social hints

Let someone know that you have written something new is almost as important as writing new post itself.

Here there are some useful stuff to do

- **insert a property `title`**, on top of the article, Keep it short, for the sake of sharing. I suggest max 5 word length, longer titles will hide the description while sharing on Facebook.

- **insert a short `description`**, tag that will be used on Facebook (cropped) and X. Keep this also short.

- **add an image** in repo to be used as a **social sharing preview**. It should be fitted with the content. Best dimensions: 1600px x 900px. If in doubt, you can use [some default images](static/images/social/suggested/2.png). If omitted, [the default one will be used](static/images/social/social-preview.png).

- custom twitter image should be **linked on top of the article**, as a `twitterImage` prop.

- it's better also to **include the twitter image on top** of the article.

- keep in mind that previews in Facebook, Linkedin and X (former Twitter) **are different in size**, they will be slightly cropped on the border. Do not insert important things there.

- **Facebook sharing**: use short title (3 or 4 words). Also description should be short, otherwise it would be cropped.

- **LinkedIn sharing**: no description will be shown

- **Messagging app** (Telegram, Slack, Whatsapp) will use Twitter information

## SEO hints

[We're working on automatizing this thing](https://github.com/facile-it/facile-it.github.io/issues/73), in the meantime I'll suggest you to **insert also a [JSON+LD](https://json-ld.org/) script in the page**, regarding the content of the article. You can see [this page for inspiration](content/blog/eng/v-protetto8-9-2023.md).

In a tag `<script>` add a JSON object with all the information regarding your post. This will be used by Google crawler to get your content, and properly indexing it. *The better this data will be written, the greater visibility it gets*.

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
