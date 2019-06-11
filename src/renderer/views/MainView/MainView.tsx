import { Route, RouteComponentProps } from 'react-router'
import { useContext, useEffect } from 'react'

import SplitLayout from '../../components/SplitLayout'
import Sidebar from '../../containers/Sidebar'
import Database from '../../Database'
import GroupView from '../GroupView'
import { listGroups, useDispatch } from '../../store/actions'
import { ThemeContext } from '../../styles'

export interface Props extends RouteComponentProps {}

export default function MainView (props: Props) {
  const theme = useContext(ThemeContext)
  const dispatch = useDispatch()

  useEffect(() => {
    if (Database.instance) {
      dispatch(listGroups())
    } else {
      props.history.push('/login')
    }

    return () => {
      Database.disconnect()
    }
  }, [])

  if (!Database.instance) return null

  return (
    <SplitLayout defaultSize={theme.sidebar.width} size={[160, '50%']}>
      <Sidebar />
      <Route path='/:groupId' component={GroupView} />
    </SplitLayout>
  )
}
