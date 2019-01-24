import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import Editor from '../../containers/Editor'
import { styled } from '../../styles'

export interface Props
  extends RouteComponentProps<{ groupId: string; entryId: string }> {}

export interface State {}

export default class EntryView extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {}

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <Editor />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  flex: 1;
`
