import React from 'react'
import { styled, Text } from '@committed/components'

const StyledText = styled(Text)({
  textTransform: 'uppercase',
})

export const Classification = (props) => (
  <>{props.children && <StyledText {...props} />}</>
)
