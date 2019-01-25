import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

import { styled } from '../../styles'

export interface Props
  extends RouteComponentProps<{ groupId: string; entryId: string }> {}

function Editor (props: Props) {
  return <Wrapper>{props.match.params.entryId}</Wrapper>
}

export default withRouter(Editor)

const Wrapper = styled.div`
  flex: 1;
  background: ${(p) => p.theme.editor.background};
`
