import * as React from 'react'

import { styled } from '../../styles'

export interface Props {}

export interface State {}

export default class Editor extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {}

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return <Wrapper>Editor</Wrapper>
  }
}

const Wrapper = styled.div`
  flex: 1;
  background: ${(p) => p.theme.editor.background};
`
