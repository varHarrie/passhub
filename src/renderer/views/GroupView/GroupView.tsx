import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { styled } from '../../styles'

export interface Props extends RouteComponentProps {}

export interface State {}

export default class GroupView extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {}

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return <Wrapper>GroupView</Wrapper>
  }
}

const Wrapper = styled.div``
