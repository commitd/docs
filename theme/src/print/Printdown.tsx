import React, { FC } from 'react'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { styled, mdx, Table, Theme, Flex, Link } from '@committed/components'

const StripedTable = styled(Table)(({ theme }: { theme: Theme }) => ({
  '& tr:nth-child(even)': {
    backgroundColor: theme.palette.grey[100]
  }
}))

const components = Object.assign({}, mdx.components, {
  a: ({ children, href, ...props }) => (
    <Link variant="clear" href={href} {...props}>
      {children}
    </Link>
  ),
  pre: props => (
    <Flex
      className="dontBreak"
      px={3}
      width="100%"
      style={{ overflow: 'hidden' }}
    >
      <pre style={{ flexGrow: '1' }} {...props} />
    </Flex>
  ),
  table: props => (
    <Flex className="dontBreak" px={3} pb={3} width="100%">
      <StripedTable {...props} />
    </Flex>
  ),
  ...mdx.shortcodes
})

export const Printdown: FC = props => (
  <MDXProvider components={components}>
    <MDXRenderer>{props.children}</MDXRenderer>
  </MDXProvider>
)
