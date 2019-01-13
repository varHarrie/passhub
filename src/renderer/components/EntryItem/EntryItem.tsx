import * as React from 'react'
import styled from 'styled-components'
import { Entry } from '../../models/entry'
import Icon from '../Icon'

export interface Props {
  data: Entry
}

export interface State {}

export default class EntryItem extends React.Component<Props, State> {
  public render () {
    const { data } = this.props

    return (
      <Wrapper>
        <Icon type={data.icon} size='large' />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``
