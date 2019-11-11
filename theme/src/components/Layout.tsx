import React from 'react'
import 'typeface-dosis'
import '../style/code.css'
import { Header } from './Header'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { PreviousNext } from './PreviousNext'
import { SEO, SEOProps } from './SEO'
import { useStaticQuery, graphql } from 'gatsby'
import { calculateTreeData, flattenTree } from '../util/tree'
import { Root, Header as LayoutHeader, Nav, Content } from '@commitd/layout'
import { ThemeProvider, Container } from '@commitd/components'

export interface LayoutProps extends SEOProps {}

export const Layout = ({ children, location, title, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          sidebar {
            links {
              link
              text
            }
            ignoreIndex
          }
        }
        pathPrefix
      }
      allMdx {
        edges {
          node {
            id
            fields {
              slug
              title
            }
            frontmatter {
              order
            }
          }
        }
      }
    }
  `)
  const prefix = data.site.pathPrefix || '/'
  const sidebar = data.site.siteMetadata.sidebar
  const treeData = calculateTreeData(sidebar, data.allMdx.edges)
  const flattenedData = flattenTree(treeData)
  return (
    <ThemeProvider
      fonts={{
        display:
          'Dosis, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif'
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
          <Sidebar
            sidebar={sidebar}
            prefix={prefix}
            treeData={treeData}
            location={location}
          />
        </Nav>
        <Content>
          <Container maxWidth="md">
            <main>{children}</main>
            <PreviousNext
              prefix={prefix}
              data={flattenedData}
              location={location}
            />
          </Container>
        </Content>
        <Footer />
      </Root>
    </ThemeProvider>
  )
}