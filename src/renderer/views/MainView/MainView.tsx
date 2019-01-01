import * as React from 'react'

import Editor from '../../containers/Editor'
import List from '../../containers/List'
import Sidebar from '../../containers/Sidebar'
import { styled } from '../../styles'

export interface Props {}

export interface State {}

export default class MainView extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {}

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <Sidebar />
        <Divider />
        <List />
        <Divider />
        <Editor />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const Divider = styled.div`
  width: ${(p) => p.theme.divider.size};
  background: ${(p) => p.theme.divider.background};
`
