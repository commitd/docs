import { Box, CodeStyle, ThemeProvider } from '@committed/components'
import { graphql, navigate } from 'gatsby'
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import 'typeface-dosis'
import 'typeface-lato'
import { Footer } from '../print/Footer'
import { Header } from '../print/Header'
import { Printdown } from '../print/Printdown'
import '../style/mermaid.css'
import '../style/print.css'

export default ({ pageContext, data }) => {
  useHotkeys('esc', () => navigate('/'))

  const docs = data.allDocs.edges.reduce((accu, edge) => {
    accu[edge.node.id] = edge.node.body
    return accu
  }, {})
  return (
    <ThemeProvider
      choice="light"
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
      <Header />
      <Footer />
      <table className="page">
        <thead>
          <tr>
            <td>
              <div className="header-space">&nbsp;</div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Box bgcolor="white" p={3}>
                <CodeStyle>
                  {pageContext.data.map((node) => (
                    <div style={{ breakAfter: 'page' }}>
                      <Printdown key={node.id}>{docs[node.id]}</Printdown>
                    </div>
                  ))}
                </CodeStyle>
              </Box>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div className="footer-space">&nbsp;</div>
            </td>
          </tr>
        </tfoot>
      </table>
    </ThemeProvider>
  )
}

export const pageQuery = graphql`
  query PrintQuery {
    allDocs {
      edges {
        node {
          body
          id
        }
      }
    }
  }
`
