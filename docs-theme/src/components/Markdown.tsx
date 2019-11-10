import React, { FC } from 'react'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { Link } from './Link'
import { Display, Divider, Text } from '@commitd/components'

interface MardownProps {
  children: any
}

export const Markdown: FC = (props: MardownProps) => (
  <MDXProvider
    components={{
      h1: props => <Display.d1>{props.children}</Display.d1>,
      h2: props => <Display.d2>{props.children}</Display.d2>,
      h3: props => <Display.d3>{props.children}</Display.d3>,
      h4: props => <Display.d4>{props.children}</Display.d4>,
      h5: props => <Display.d4>{props.children}</Display.d4>,
      h6: props => <Display.d4>{props.children}</Display.d4>,
      thematicBreak: () => <Divider />,
      hr: () => <Divider />,
      p: ({ children }) => <Text component="p">{children}</Text>,
      a: ({ children, href, ...props }) => (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }}
  >
    <MDXRenderer scope="" components={{}}>
      {props.children}
    </MDXRenderer>
  </MDXProvider>
)
