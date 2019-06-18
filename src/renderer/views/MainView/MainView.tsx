import { Route, RouteComponentProps } from 'react-router'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import SplitLayout from '../../components/SplitLayout'
import Database from '../../Database'
import GroupView from '../GroupView'
import SideView from '../SideView'
import { ThemeContext } from '../../styles'
import { useAppStore } from '../../store'

export interface Props extends RouteComponentProps {}

export default observer(function MainView (props: Props) {
  const { history } = props

  const theme = useContext(ThemeContext)
  const store = useAppStore()

  useEffect(() => {
    if (Database.instance) {
      store.listGroups()
    } else {
      history.push('/login')
    }

    return () => Database.disconnect()
  }, [history])

  if (!Database.instance) return null

  return (
    <SplitLayout defaultSize={theme.sidebar.width} size={[160, '50%']}>
      <Route path='/:groupId?' component={SideView} />
      <Route path='/:groupId' component={GroupView} />
    </SplitLayout>
  )
})
