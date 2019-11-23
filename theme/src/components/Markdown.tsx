import React, { FC } from 'react'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { Link } from './Link'
import { mdx, Text } from '@commitd/components'

interface MardownProps {
  children: any
}

const components = Object.assign(mdx.components, {
  a: ({ children, href, ...props }) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),
  li: props => (
    <li>
      <Text {...props} />
    </li>
  )
})

export const Markdown: FC = (props: MardownProps) => (
  <MDXProvider components={components}>
    <MDXRenderer>{props.children}</MDXRenderer>
  </MDXProvider>
)
