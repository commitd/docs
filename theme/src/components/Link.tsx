import React from 'react'
import { navigate } from 'gatsby'
import { styled, Link as RawLink, LinkProps, colors } from '@commitd/components'
import { cursor } from 'sisteransi'

const aColor = colors.committedYellow[300]
const bColor = colors.red[200]
const internal = `linear-gradient(${aColor}, ${aColor})`
const external = `linear-gradient(${bColor}, ${bColor})`

const isExternal = (url: string) => url && url.startsWith('http')

const Styled: React.ComponentType<LinkProps> = styled(RawLink)({
  color: 'inherit',
  textDecoration: 'none',
  transition: 'background 100ms ease-out',
  fontWeight: 'bold',
  background: ({ href }) =>
    `${
      isExternal(href) ? external : internal
    } left bottom transparent no-repeat`,
  backgroundSize: () => '100% 2px',
  ['&:hover']: {
    backgroundSize: '100% 100%'
  }
})

const Cleared: React.ComponentType<LinkProps> = styled(RawLink)({
  color: 'inherit',
  textDecoration: 'none',
  ['& .gatsby-resp-image-background-image']: {
    display: 'none !important'
  },
  ['&:hover']: {
    textDecoration: 'none',
    cursor: 'pointer'
  }
})

export const Link: React.FC<LinkProps> = ({ href, ...props }: LinkProps) => {
  if (isExternal(href)) {
    return <Styled href={href} target="_blank" {...props} />
  }
  if (props.className && props.className.includes('gatsby-resp-image-link')) {
    console.log('test')
    return <Cleared href={href} target="_blank" {...props} />
  }
  return <Styled onClick={() => navigate(href)} {...props} />
}

export const ClearLink: React.FC<LinkProps> = ({
  href,
  ...props
}: LinkProps) => {
  if (isExternal(href)) {
    return <Cleared href={href} target="_blank" {...props} />
  } else {
    return <Cleared onClick={() => navigate(href)} {...props} />
  }
}
