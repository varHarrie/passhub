import * as React from 'react'
import styled from 'styled-components'

export interface Props {}

export interface State {}

export default class List extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {}

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return <Wrapper>List</Wrapper>
  }
}

const Wrapper = styled.div`
  width: ${(p) => p.theme.list.width};
  background: ${(p) => p.theme.list.background};
`
