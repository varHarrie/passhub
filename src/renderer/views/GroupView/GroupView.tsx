import { Route, RouteComponentProps } from 'react-router'
import { useContext, useEffect } from 'react'

import SplitLayout from '../../components/SplitLayout'
import EntryView from '../EntryView'
import ListView from '../ListView'
import { ThemeContext } from '../../styles'
import { selectGroup, useDispatch } from '../../store/actions'

export interface Props extends RouteComponentProps<{ groupId: string }> {}

export default function GroupView (props: Props) {
  const groupId = props.match.params.groupId
  const theme = useContext(ThemeContext)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(selectGroup(groupId))
    return () => {
      dispatch(selectGroup())
    }
  }, [groupId])

  return (
    <SplitLayout defaultSize={theme.list.width} size={[200, '50%']}>
      <Route path='/:groupId/:entryId?' component={ListView} />
      <Route path='/:groupId/:entryId/:editable?' component={EntryView} />
    </SplitLayout>
  )
}
