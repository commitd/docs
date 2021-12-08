---
title: 'Instructions'
order: '0'
description: 'Instructions to create documentation using Committed docs-theme'
---

# Instructions

## Getting started

Write your documentation in [Markdown](https://www.markdownguide.org/) or [MDX](https://mdxjs.com/) in the `docs` folder. Add the dependencies

```bash
yarn add @committed/gatsby-theme-docs gatsby react react-dom

# or

npm add @committed/gatsby-theme-docs gatsby react react-dom
```

and configure in `gatsby-config.js` with your site metadata e.g.

```javascript
module.exports = {
  siteMetadata: {
    title: 'Title',
    author: 'Author',
    description: 'Description',
    siteUrl: 'https://your.site.url',
  },
  plugins: [
    {
      resolve: `@committed/gatsby-theme-docs`,
      options: {},
    },
  ],
}
```

Further options are available to customize, detailed below.

## Docs

The `index.md(x)` file is shown on load.

Each documentation page can add frontmatter that is used to improve SEO. You can add metadata, [order](ordered/index.md) the pages and add user friendly links:

```markup
---
title: "The title (used in links)"
order: "key for ordering (defaults to title)"
description: "This is the meta description"
metaDescription: "This is the meta tag title, but will default to title"
metaTescription: "This is the meta tag description, , but will default to description"

---
```

If no title is provided the filename is used. The sidebar is populated from the files in `docs` folder and supports [nesting](nested/index.md) in sub-folders. At each level the contents are sorted using alphanumerically using the order frontmatter or the title.

## Navigation

The Sidebar on the left allows you to navigate between the docs pages according to the [nested](/nested/) and [ordered](/ordered/) folder structure.

The next and previous pages are also linked at the bottom of each page automatically.

### Keyboard Navigation

You can also navigate with the keyboard using `left` and `right` arrows for previous and next and using `shift+up` and `shift+down` to go to the next and previous top level folder. Finally, `shift+home` goes to the home page.

## Printing

An additional page on `/print` is provided in order to print (or print to pdf) the docs.
Use keyboard shortcut `shift+p` to navigate to the print page (then `cmd+p` to print), `esc` to go back home.

## Search

Search is added by default but can be turned off in the config by setting search `false`.

## Configuration

Options can be supplied to configure the docs.
A full example is shown below.

```javascript
module.exports = {
  // pathPrefix defaults to `/`
  pathPrefix: "/docs",
  siteMetadata: {
    title: "Committed Docs Theme",
    author: "Committed",
    description: "Documentation built with mdx.",
    siteUrl: "https://committed.software/docs",
  },
  plugins: [
    {
      resolve: `@committed/docs-theme`,
      options: {
        // docsPath defaults to `/docs`
        docsPath: "documents",
        header: {
          title: "Committed Docs Example",
          logo: { image: "", link: "/" },
          helpUrl: "",
          links: [
            { text: "example", link: "/example1" },
            { text: "mdx", link: "/example2" }
          ]
        },
        sidebar: {
          links: [{ text: "Example", link: "https://committed.io" }],
          ignoreIndex: false
        },
        print: {
          classification: "OPEN SOURCE"
          reference: "https://committed.software/docs"
        },
        // can omit search when true, as true is the default
        search: false
      }
    }
  ]
};
```

The `docsPath` allows you to specify a different folder for the documentation, and the `pathPrefix` option can specify the path if the site is hosted at a nested path.

### Links

The options allow links to be added to the sidebar and header the links have the format:

```json
{
  // The display text
  text: "example"
  // the relative or absolute link
  link: "/example"
}
```

Any internal links that are [broken](/broken) will be warned about at in `develop` and error at `build` time. This can be configured under a `checkLinks` key in the options. There are two options: ignore and exceptions, and while they both expect an array of paths, they work differently.

```json
// gatsby-config.js
module.exports = {
  siteMetadata: {
    ...
  },
  plugins: [
    {
      resolve: `@committed/docs-theme`,
      options: {
        ...
        checkLinks: {
            ignore: [
              '/foo/bar',
              '/generated/docs/'
            ],
            exceptions: [
              '/bar/baz/',
              '/dynamic/headings/'
            ]
          }
        }
    }
  ]
};
```

| Option     | Default | Description                                                                                                                           |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| ignore     | `[]`    | Paths passed to ignore will not have their content checked for broken links.                                                          |
| exceptions | `[]`    | Paths passed to exceptions will ensure that any links from other pages to these paths or hashes within them will not count as broken. |
| verbose    | `true`  | Disable logs and warnings in your console by passing false to the verbose option, which is true by default.                           |

#### Caveats

Once a markdown page has been cached by Gatsby, you won't see any output about its broken links until the file changes or your cache gets cleared. If you want to see link check output for all files every time you run `npm start`, you can set up a `prestart` script that removes your Gatsby cache directory:

```json
{
  "scripts": {
    "prestart": "gatsby clean"
  }
}
```

### Header

In the header you can configure the logo, text and links.

| Option  | Default                    | Description                                                             |
| :------ | :------------------------- | :---------------------------------------------------------------------- |
| title   | (metadata title)           | The title of the page shown in the header                               |
| logo    | `{ image: "", link: "/" }` | The relative or absolute image url, and the link the image should go to |
| helpUrl | -                          | If a url is specified a help link is added                              |
| links   | `[]`                       | An array of Links to add in the header                                  |

### Sidebar

In the sidebar you can add further links and choose to add in the index page.

| Option      | Default | Description                                                                                |
| :---------- | :------ | :----------------------------------------------------------------------------------------- |
| links       | []      | Add external links to the sidebar by specifying the text to show and the link.             |
| ignoreIndex | true    | Set false to add the index to the sidebar. By default the index is linked from the header. |
