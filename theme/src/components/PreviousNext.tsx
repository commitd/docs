import React, { useContext } from 'react'
import { Info } from '../types'
import { DocsContext } from './Layout'
import { useHotkeys } from 'react-hotkeys-hook'
import { Flex, Button, Divider, Icons } from '@committed/components'

export interface PreviousNextProps {
  previous?: Info
  next?: Info
}

export const PreviousNext = ({ previous, next }: PreviousNextProps) => {
  const { navigate } = useContext(DocsContext)
  let justifyContent = 'space-between'
  if (next && !previous) {
    justifyContent = 'flex-end'
  }
  if (!next && previous) {
    justifyContent = 'flex-start'
  }

  if (previous) {
    useHotkeys('left', () => navigate(previous.url))
    useHotkeys('shift+left', () => navigate(previous.url))
  }

  if (next) {
    useHotkeys('right', () => navigate(next.url))
    useHotkeys('shift+right', () => navigate(next.url))
  }

  return (
    <>
      <Divider my={3} />
      <Flex mb={4} width={1} justifyContent={justifyContent}>
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
