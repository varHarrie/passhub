import * as React from 'react'
import styled from 'styled-components'
import * as Feather from 'react-feather'

export type IconType = keyof typeof Feather

export interface Props {
  type: IconType
}

export interface State {}

export default class Icon extends React.Component<Props, State> {
  public render () {
    const { type } = this.props

    const Image = Feather[type]

    return (
      <Wrapper>
        <Image size={14} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  color: inherit;

  svg {
    vertical-align: middle;
  }
`
