export interface Doc {
  id: string
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  order: string
  body: string
  // tableOfContents: object
}

export interface Page {
  title: string
  metaTitle?: string
  metaDescription?: string
}

export interface Node {
  items: Item[]
  slug?: string
  info?: Info
}

export interface Info {
  id: string
  url: string
  order: string
  title: string
}

export interface Item extends Node {
  id: string
  label: string
  info?: Info
  items: Item[]
}

export interface Link {
  text: string
  link: string
}

export interface Header {
  title: string
  logo: {
    image?: string
    link?: string
  }
  helpUrl?: string
  links: Link[]
}

export interface Sidebar {
  links: Link[]
  ignoreIndex: boolean
}

export interface PageContext {
  id: string
  previous?: Info
  next?: Info
  current?: Info
}
