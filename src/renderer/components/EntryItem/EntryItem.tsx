import * as React from 'react'

import Icon from '../Icon'
import { Entry } from '../../models/entry'
import { styled } from '../../styles'

export interface Props {
  className?: string
  data: Entry
}

export interface State {}

export default function EntryItem (props: Props) {
  const { className, data } = props

  return (
    <Wrapper className={className}>
      <Icon type={data.icon} size='large' />
    </Wrapper>
  )
}

const Wrapper = styled.div``
