import React, { FC } from 'react'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import {
  styled,
  mdx,
  Text,
  Box,
  Table,
  Theme,
  Flex
} from '@committed/components'

const StripedTable = styled(Table)(({ theme }: { theme: Theme }) => ({
  '& tr:nth-child(even)': {
    backgroundColor: theme.palette.grey[100]
  }
}))

const components = Object.assign(mdx.components, {
  a: ({ children, href, ...props }) => (
    <Text component="span" {...props}>
      {children}
    </Text>
  ),
  pre: props => (
    <Flex
      className="dontBreak"
      width="calc(100% -16px)"
      style={{ overflow: 'hidden' }}
    >
      <pre style={{ flexGrow: '1' }} {...props} />
    </Flex>
  ),
  table: props => (
    <Flex className="dontBreak" width="calc(100% -16px)">
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
