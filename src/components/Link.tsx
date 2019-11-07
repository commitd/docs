import React from 'react'
import { navigate } from "gatsby"
import { styled, Link as RawLink, LinkProps, colors } from '@commitd/components'


const aColor = colors.committedYellow[300]
const bColor = colors.red[200]
const internal = `linear-gradient(${aColor}, ${aColor})`
const external = `linear-gradient(${bColor}, ${bColor})`

const isExternal = (url: string) => url.startsWith('http')

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
})

export const Link: React.FC<LinkProps> = ({
  href,
  ...props
}: LinkProps) => {
  if (isExternal(href)) {
    return <Styled href={href} target="_blank" {...props} />
  } else {
    return (
      <Styled href={'javascript:;'} onClick={() => navigate(href)} {...props} />
    )
  }
}

export const ClearLink: React.FC<LinkProps> = ({
  href,
  ...props
}: LinkProps) => {
  if (isExternal(href)) {
    return <Cleared href={href} target="_blank" {...props} />
  } else {
    return (
      <Cleared href={'javascript:;'} onClick={() => navigate(href)} {...props} />
    )
  }
}