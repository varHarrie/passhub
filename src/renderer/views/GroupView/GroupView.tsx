import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router'

import EntryList from '../../containers/EntryList'
import EntryView from '../EntryView'
import { styled } from '../../styles'
import { selectGroup, useDispatch } from '../../store/actions'

export interface Props extends RouteComponentProps<{ groupId: string }> {}

export default function GroupView (props: Props) {
  const groupId = props.match.params.groupId
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(selectGroup(groupId))
    return () => {
      dispatch(selectGroup())
    }
  }, [groupId])

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
