import React, { FC } from 'react'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { Link } from './Link'
import { mdx } from '@committed/components'

interface MardownProps {
  children: any
}

const components = Object.assign(mdx.components, {
  a: ({ children, href, ...props }) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),
  ...mdx.shortcodes
})

export const Markdown: FC = (props: MardownProps) => (
  <MDXProvider components={components}>
    <MDXRenderer>{props.children}</MDXRenderer>
  </MDXProvider>
)
