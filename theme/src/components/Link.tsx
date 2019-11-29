import React from 'react'
import { navigate } from 'gatsby'
import { Link as RawLink, LinkProps } from '@committed/components'

const isExternal = (url: string) => url && url.startsWith('http')
const isInPage = (url: string) => url && url.startsWith('#')

export const Link: React.FC<LinkProps> = ({ href, ...props }: LinkProps) => {
  if (isExternal(href)) {
    return <RawLink variant="styled" href={href} target="_blank" {...props} />
  }
  if (props.className && props.className.includes('gatsby-resp-image-link')) {
    return <RawLink variant="clear" href={href} target="_blank" {...props} />
  }
  if (props.className && props.className.includes('autolink')) {
    // Do not show the generated header links
    return null
  }
  if (isInPage(href)) {
    return <RawLink variant="styled" href={href} {...props} />
  }
  return <RawLink variant="styled" onClick={() => navigate(href)} {...props} />
}

export const ClearLink: React.FC<LinkProps> = ({
  href,
  ...props
}: LinkProps) => {
  if (isExternal(href)) {
    return <RawLink variant="clear" href={href} target="_blank" {...props} />
  } else {
    return <RawLink variant="clear" onClick={() => navigate(href)} {...props} />
  }
}
