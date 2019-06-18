import { Route, RouteComponentProps } from 'react-router'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import SplitLayout from '../../components/SplitLayout'
import EntryView from '../EntryView'
import ListView from '../ListView'
import { ThemeContext } from '../../styles'
import { useAppStore } from '../../store'

export interface Props extends RouteComponentProps<{ groupId: string }> {}

export default observer(function GroupView (props: Props) {
  const { groupId } = props.match.params

  const theme = useContext(ThemeContext)
  const store = useAppStore()

  useEffect(() => {
    store.selectGroup(groupId)
  }, [groupId])

  return (
    <SplitLayout defaultSize={theme.list.width} size={[200, '50%']}>
      <Route path='/:groupId/:entryId?' component={ListView} />
      <Route path='/:groupId/:entryId/:editable?' component={EntryView} />
    </SplitLayout>
  )
})
