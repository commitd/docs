export interface Page {
  title: string
  metaTitle?: string
  metaDescription?: string
}

export interface Node {
  items: Item[]
  info?: Info
}

export interface Info {
  url: string
  order: string
  title: string
}

export interface Item extends Node {
  id: string
  label: string
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