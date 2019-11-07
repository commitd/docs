import React from "react"
import "typeface-dosis"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { SEO, SEOProps } from "./SEO"
import {
  Root,
  Header as LayoutHeader,
  Nav,
  Content,
  Footer as LayoutFooter,
} from "@commitd/layout"
import { ThemeProvider, Container } from "@commitd/components"

export interface LayoutProps extends SEOProps {}

export const Layout = ({ children, location, title, ...props }) => {
  return (
    <ThemeProvider
      fonts={{
        display:
          'Dosis, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      <SEO title={title} {...props} />
      <Root
        style={{ minHeight: "100vh" }}
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
            ctx => null
          }
        >
          <Sidebar location={location} />
        </Nav>
        <Content>
          <Container maxWidth="md">
            <main>{children}</main>
          </Container>
        </Content>
        <LayoutFooter />
      </Root>
    </ThemeProvider>
  )
}
