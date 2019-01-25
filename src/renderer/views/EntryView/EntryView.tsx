import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import Editor from '../../containers/Editor'
import { styled } from '../../styles'

export interface Props
  extends RouteComponentProps<{ groupId: string; entryId: string }> {}

export default function EntryView (props: Props) {
  return (
    <Wrapper>
      <Editor />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
`
