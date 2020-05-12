import React, { FC } from 'react'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { Link } from './Link'
import { styled, mdx, Table, Theme } from '@committed/components'

interface MardownProps {
  children: any
}

const StripedTable = styled(Table)(({ theme }: { theme: Theme }) => ({
  '& tr:nth-child(even)': {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  },
}))

const components = Object.assign({}, mdx.components, {
  a: ({ children, href, ...props }) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),
  table: (props) => <StripedTable {...props} />,
  ...mdx.shortcodes,
})

export const Markdown: FC = (props: MardownProps) => (
  <MDXProvider components={components}>
    <MDXRenderer>{props.children}</MDXRenderer>
  </MDXProvider>
)
