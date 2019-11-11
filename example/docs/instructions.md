---
title: "Instructions"
order: "0"
metaTitle: "Instructions"
metaDescription: "Instructions to create documentation using Committed docs-theme"
---

# Instructions

## Getting started

Write your documentation in [Markdown](https://www.markdownguide.org/) or [MDX](https://mdxjs.com/) in the `docs` folder. Add the dependencies

```bash
yarn add @commitd/gatsby-theme-docs gatsby react react-dom
```

and configure in `gatsby-config.js` with your site metadata e.g.

```javascript
module.exports = {
  siteMetadata: {
    title: "Title",
    author: "Author",
    description: "Description",
    siteUrl: "https://your.site.url"
  },
  plugins: [
    {
      resolve: `@commitd/gatsby-theme-docs`,
      options: {}
    }
  ]
};
```

Further options are available to customise, detailed beow.

## Docs

The `index.md(x)` file is shown on load. Each documentation page can add frontmatter that is used to add metadata, [order](/ordered/ob) the pages and add user friendly links:

```
---
title: "The title (used in links)"
order: "key for ordering"
metaTitle: "This is the meta title tag of this page"
metaDescription: "This is the meta description"
---
```

The sidebar is populated from the files in `docs` folder and supports [nesting](/nested) in sub-folders.
At each level the contents are sorted using alphanumerically using the order frontmatter or the title.

## Configuration

Options can be supplied to congifure the docs.
A full example is shown below.

```javascript
module.exports = {
  siteMetadata: {
    title: "Committed Docs Theme",
    author: "Committed",
    description: "Documentation built with mdx.",
    siteUrl: "https://committed.software/docs",
    docsLocation: "https://github.com/commitd/docs-starter/tree/master/content"
  },
  plugins: [
    {
      resolve: `@commitd/docs-theme`,
      options: {
        contentPath: "docs",
        basePath: "/",
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
          ignoreIndex: true
        }
      }
    }
  ]
};
```

### Links

The options allow links to be added to the sidebar and header the links have the format:

```json
{
  // The display text
  text: "example"
  // the relative or absolute link
  link: "/example
}
```

### Header

In the header you can configure the logo, text and links.

| Option  | Default                     | Description                                                               |
| :------ | :-------------------------- | :------------------------------------------------------------------------ |
| title   | (metadata title)            | The title of the page shown in the header                                 |
| logo    |  `{ image: "", link: "/" }` | The relative or absolute image url, and the link the image should go to   |
| helpUrl | -                           | If a url is specified a help link is added                                |
| links   | `[]`                        | An array of Links to add in the header                                    |

### Sidebar

In the sidebar you can add further links and choose to add in the index page.

| Option      | Default | Description                                                                                |
| :---------- | :------ | :----------------------------------------------------------------------------------------- |
| links       | []      | Add external links to the sidebar by specifying the text to show and the link.             |
| ignoreIndex | true    | Set false to add the index to the sidebar. By default the index is linked from the header. |


