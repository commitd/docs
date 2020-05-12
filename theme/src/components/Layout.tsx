import { Box, CodeStyle, Container, ThemeProvider } from '@committed/components'
import { Content, Header as LayoutHeader, Nav, Root } from '@committed/layout'
import { navigate } from 'gatsby'
import React, { Dispatch, ReactNode, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import 'typeface-dosis'
import 'typeface-lato'
import { PageContext } from '../types'
import { Footer } from './Footer'
import { Header } from './Header'
import { PreviousNext } from './PreviousNext'
import { SEO, SEOProps } from './SEO'
import { Sidebar } from './Sidebar'

export interface LayoutProps extends Omit<SEOProps, 'title'> {
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
  pageContext = { id: 'default' },
  children,
  location = {},
  ...props
}: LayoutProps) => {
  const [collapsed, setCollapsed] = useState((location && location.state) || {})
  useHotkeys('shift+home', () => navigate('/'))
  useHotkeys('shift+p', () => navigate('/print'))

  const navigateTo = (url) => {
    navigate(url, {
      state: collapsed,
    })
  }

  return (
    <DocsContext.Provider
      value={{
        pathname: location.pathname,
        navigate: navigateTo,
        collapsed,
        setCollapsed,
      }}
    >
      <ThemeProvider
        fonts={{
          display: {
            fontFamily:
              'Dosis, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif',
            fontWeight: 700,
          },
          text: {
            fontFamily:
              'Lato, -apple-system, BlinkMacSystemFont, "San Francisco", Roboto,  "Segoe UI", "Helvetica Neue"',
          },
        }}
      >
        {pageContext.current && pageContext.current.title && (
          <SEO title={pageContext.current.title} {...props} />
        )}
        <Root
          style={{ minHeight: '100vh' }}
          config={{
            collapsible: false,
          }}
        >
          <LayoutHeader>
            <Header />
          </LayoutHeader>
          <Nav
            header={
              // you can provide fixed header inside nav
              // change null to some react element
              (ctx) => null
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
