---
title: "Instructions"
order: "0"
metaTitle: "This is the title tag of this page"
metaDescription: "This is the meta description"
---

# Instructions

## Content

Documentaion should be placed in the `content` folder. The documentation can be written in [Markdown](https://www.markdownguide.org/) or [MDX](https://mdxjs.com/). Each file must have a `title` declared in the frontmatter and can also contain the following.

```
---
title: "The title"
order: "key for ordering"
metaTitle: "This is the meta title tag of this page"
metaDescription: "This is the meta description"
---
```

The sidebar is populated from the files in `content` and supports nesting in sub-folders.
At each level the contents are sorted using alphanumerically using the order frontmatter or the title.

## Configuration

A configuration object should be supplied.
A full example is shown below.

```json
{
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://committed.software/docs",
  },
  header: {
    logo: "",
    logoLink: "/",
    title: "Committed Docs Starter",
    githubUrl: "https://github.com/commitd/docs-theme",
    helpUrl: "",
    links: [{ text: "example", link: "/example" }],
  },
  sidebar: {
    links: [{ text: "Example", link: "https://committed.io" }],
    ignoreIndex: true,
  },
  siteMetadata: {
    title: "Committed Docs",
    author: "Committed",
    description: "Documentation built with mdx.",
    ogImage: null,
    docsLocation: "https://github.com/commitd/docs-theme/tree/master/content",
    favicon: "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg",
  },
}
```

## Index

You should replace the `index.md` file. This file is shown on first load and linked to the home area in the title bar.