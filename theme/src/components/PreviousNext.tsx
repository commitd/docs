import { Button, Divider, Flex, Icons } from '@committed/components'
import React, { useCallback, useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Info } from '../types'
import { DocsContext } from './Layout'

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

  const navigateToPrevious = useCallback(() => {
    if (previous) {
      navigate(previous.url)
    }
  }, [previous, navigate])

  const navigateToNext = useCallback(() => {
    if (next) {
      navigate(next.url)
    }
  }, [navigate, next])

  useHotkeys('left', navigateToPrevious, [navigateToPrevious])
  useHotkeys('shift+left', navigateToPrevious, [navigateToPrevious])
  useHotkeys('right', navigateToNext, [navigateToNext])
  useHotkeys('shift+right', navigateToNext, [navigateToNext])

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
