import React from 'react'
import { Info } from '../types'
import { navigate } from 'gatsby'
import { Flex, Button, Divider, Icons } from '@commitd/components'

export interface PreviousNextProps {
  prefix: string
  data: Info[]
  location?: any
}

export const PreviousNext = ({ prefix, location, data }: PreviousNextProps) => {
  const isActive = ({ url }) =>
    (location &&
      (location.pathname === url || location.pathname === prefix + url)) ||
    false

  const active = data.findIndex(isActive)
  let previous
  let next

  if (active > 0) {
    previous = data[active - 1]
  }
  if (active >= 0 && active < data.length - 1) {
    next = data[active + 1]
  }

  let justifyContent = 'space-between'
  if (next && !previous) {
    justifyContent = 'flex-end'
  }
  if (!next && previous) {
    justifyContent = 'flex-start'
  }

  return (
    <>
      <Divider my={3} />
      <Flex width={1} justifyContent={justifyContent}>
        {previous && (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => navigate(previous.url)}
          >
            <Icons.ArrowBack />
            {previous.title}
          </Button>
        )}
        {next && (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => navigate(next.url)}
          >
            {next.title}
            <Icons.ArrowForward />
          </Button>
        )}
      </Flex>
    </>
  )
}
