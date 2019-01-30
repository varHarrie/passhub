import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router'

import SplitLayout from '../../components/SplitLayout'
import EntryList from '../../containers/EntryList'
import EntryView from '../EntryView'
import { styled, ThemeContext } from '../../styles'
import { selectGroup, useDispatch } from '../../store/actions'

export interface Props extends RouteComponentProps<{ groupId: string }> {}

export default function GroupView (props: Props) {
  const groupId = props.match.params.groupId
  const theme = React.useContext(ThemeContext)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(selectGroup(groupId))
    return () => {
      dispatch(selectGroup())
    }
  }, [groupId])

  return (
    <SplitLayout defaultSize={theme.list.width} size={[200, '50%']}>
      <EntryList />
      <Route path='/:groupId/:entryId' component={EntryView} />
    </SplitLayout>
  )
}
