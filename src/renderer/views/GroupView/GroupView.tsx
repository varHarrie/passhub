import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router'

import EntryList from '../../containers/EntryList'
import EntryView from '../EntryView'
import { styled } from '../../styles'

export interface Props extends RouteComponentProps<{ groupId: string }> {}

export default function GroupView (props: Props) {
  return (
    <Wrapper>
      <EntryList />
      <Divider />
      <Route path='/:groupId/:entryId' component={EntryView} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
`

const Divider = styled.div`
  width: ${(p) => p.theme.divider.size};
  background: ${(p) => p.theme.divider.background};
`
