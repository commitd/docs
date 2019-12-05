import React from 'react'
import { Layout } from '../components/Layout'
import { Display, Text, Box, Loader } from '@committed/components'

const NotFoundPage = ({ location }) => (
  <Layout location={location} title="404: Not found">
    <Box m={4}>
      <Display.d1 align="center">404</Display.d1>
      <Box m={4}>
        <Loader variant={'spin'} color="secondary.dark" size={200} />
      </Box>
      <Text align="center">We don't have any docs for that, PR's welcome!</Text>
    </Box>
  </Layout>
)

export default NotFoundPage
