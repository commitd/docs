import React from 'react'
import { Layout } from '../components/Layout'

export default props => {
  const { children, pageContext, location } = props

  // Pass through when in print mode
  if (pageContext.layout === 'print') {
    return <>{children}</>
  } else {
    return (
      <Layout id={pageContext.id} pageContext={pageContext} location={location}>
        {children}
      </Layout>
    )
  }
}
