import React, { FC } from 'react'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { Link } from './Link'
import { Display, Divider, Text, Box, theme } from '@commitd/components'

interface MardownProps {
  children: any
}

export const Markdown: FC = (props: MardownProps) => (
  <MDXProvider
    components={{
      h1: props => <Display.d1 {...props} />,
      h2: props => <Display.d2 {...props} />,
      h3: props => <Display.d3 {...props} />,
      h4: props => <Display.d4 {...props} />,
      h5: props => <Display.d4 {...props} component="h5" />,
      h6: props => <Display.d4 {...props} component="h6" />,
      thematicBreak: () => <Divider />,
      hr: () => <Divider />,
      p: ({ children }) => <Text component="p">{children}</Text>,
      a: ({ children, href, ...props }) => (
        <Link href={href} {...props}>
          {children}
        </Link>
      ),
      blockquote: props => (
        <Box
          borderLeft={`solid ${theme.spacing(2)}px ${
            theme.palettes.brand[200]
          }`}
          pl={3}
        >
          <Text {...props} />
        </Box>
      )
    }}
  >
    <MDXRenderer>{props.children}</MDXRenderer>
  </MDXProvider>
)
