<p align="center">
  <a href="https://committed.io">
    <img alt="Committed" src="./example/Avatar.png" width="60" />
  </a>
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
  <img alt="Docs" src="./docs.svg" width="60" />
</p>
<h1 align="center">
 Committed Gatsby Theme for Docs
</h1>

[![Committed Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fcommitted.software%2Fbadge)](https://committed.io)
[![Build Status](https://drone.committed.software/api/badges/commitd/docs/status.svg)](https://drone.committed.software/commitd/docs)

A theme for writing documentation sites in Markdown.

## 🔥 Features

- Write using Markdown / [MDX](https://github.com/mdx-js/mdx)
- Committed style theme
- Syntax Highlighting using Prism
- Automatically generated sidebar navigation, previous/next
- Diagrams using mermaid
- emojis using :shortcodes:
- SEO friendly
- Fully customizable
- 🔍 Search

## 🔗 Live Demo and Instructions

Here's a [live demo](https://committed.software/docs)

## 🚀 Quickstart

Get started by adding the dependencies:

```bash
yarn add @committed/gatsby-theme-docs gatsby react react-dom
```

and configure in `gatsby-config.js` with your site metadata e.g.

```javascript
module.exports = {
  siteMetadata: {
    title: "Title",
    author: "Author",
    description: "Description",
    siteUrl: "https://your.site.url",
  },
  plugins: [
    {
      resolve: `@committed/gatsby-theme-docs`,
      options: {},
    },
  ],
};
```

Put your markdown docs in `/docs/` and run:

```bash
gatsby develop
```

Visit `http://localhost:8000/` to view the site.

Full text search is provided, but you MUST clean first to reindex the content:

```bash
gatsby clean
# Then:
gatsby build
# Or
gatbsy develop
```

For full instructions see the [live demo](https://committed.software/theme).

## 🤖 SEO friendly

The docs come with SEO. Configure meta tags like title and description for each markdown file using MDX Frontmatter

```markup
---
title: "Title of the page"
metaTitle: "Meta Title Tag for this page"
metaDescription: "Meta Description Tag for this page"
---
```

Canonical URLs are generated automatically.

## Development

We use yarn workspaces to develop the theme alongside an example usage that also serves as a documentation site for this project.

On first use run

```bash
npm install
```

### Layout

A simplified layout is shown below

```shell
.
├── README.md
├── theme
│   ├── README.md
│   ├── gatsby-config.js
│   ├── gatsby-node.js
│   ├── index.js
│   └── package.json
│   └── src
├── example
│   ├── README.md
│   ├── gatsby-config.js
│   ├── package.json
│   └── docs
├── package.json
└── package-lock.json
```

### `theme`

The theme is defined by the `gatsby-config.js` file with the `gatsby-node.js` supplying the content from the site using the theme. The `src` folder contains the code for the theme, with the components used stored in the `theme/src/components` folder. Each markdown file is rendered using the `theme/src/layout/docs.tsx` to layout the supporting components and configure the markdown.

### `example`

This is an example usage of the theme. It looks the same as the
site of someone who installed and used your theme.

- `example/`
  - `gatsby-config.js`: Specifies which theme to use and any other one-off config a site might need.
  - `docs/`: The markdown documentation pages that make up the site.

You can run the example with:

```shell
yarn workspace example develop
```
