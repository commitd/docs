import React from 'react'
import { styled, Text } from '@committed/components'

const StyledText = styled(Text)({})

export const Reference = props => (
  <>{props.children && <StyledText {...props} />}</>
)
