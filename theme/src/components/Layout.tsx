import React, { useState, ReactNode, Dispatch } from 'react'
import 'typeface-dosis'
import 'typeface-lato'
import { Header } from './Header'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { PageContext } from '../types'
import { PreviousNext } from './PreviousNext'
import { SEO, SEOProps } from './SEO'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import { Root, Header as LayoutHeader, Nav, Content } from '@committed/layout'
import { ThemeProvider, CodeStyle, Container, Box } from '@committed/components'

export interface LayoutProps extends SEOProps {
  id: string
  pageContext: PageContext
  location: any
  children: ReactNode
}

export type DocsContextProps = {
  pathname: string
  navigate: (string) => void
  collapsed: any
  setCollapsed: Dispatch<any>
}

export const DocsContext = React.createContext<Partial<DocsContextProps>>({})

export const Layout = ({
  id,
  pageContext,
  children,
  location = {},
  title,
  ...props
}: LayoutProps) => {
  const [collapsed, setCollapsed] = useState((location && location.state) || {})

  const navigateTo = url => {
    navigate(url, {
      state: collapsed
    })
  }

  return (
    <DocsContext.Provider
      value={{
        pathname: location.pathname,
        navigate: navigateTo,
        collapsed,
        setCollapsed
      }}
    >
      <ThemeProvider
        fonts={{
          display: {
            fontFamily:
              'Dosis, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif',
            fontWeight: 700
          },
          text: {
            fontFamily:
              'Lato, -apple-system, BlinkMacSystemFont, "San Francisco", Roboto,  "Segoe UI", "Helvetica Neue"'
          }
        }}
      >
        <SEO title={title} {...props} />
        <Root
          style={{ minHeight: '100vh' }}
          config={{
            collapsible: false
          }}
        >
          <LayoutHeader>
            <Header />
          </LayoutHeader>
          <Nav
            header={
              // you can provide fixed header inside nav
              // change null to some react element
              ctx => null
            }
          >
            <Sidebar location={location} current={id} />
          </Nav>
          <Content>
            <Container maxWidth="md">
              <Box py={3}>
                <CodeStyle>
                  <main>{children}</main>
                </CodeStyle>
                <PreviousNext
                  previous={pageContext.previous}
                  next={pageContext.next}
                />
              </Box>
            </Container>
          </Content>
          <Footer />
        </Root>
      </ThemeProvider>
    </DocsContext.Provider>
  )
}
