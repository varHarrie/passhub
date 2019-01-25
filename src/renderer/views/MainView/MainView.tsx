import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router'

import Sidebar from '../../containers/Sidebar'
import Database from '../../Database'
import GroupView from '../GroupView'
import { styled } from '../../styles'
import { listGroups, useDispatch } from '../../store/actions'

export interface Props extends RouteComponentProps {}

export default function MainView (props: Props) {
  const dispatch = useDispatch()

  React.useEffect(() => {
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
    <Wrapper>
      <Sidebar />
      <Divider />
      <Route path='/:groupId' component={GroupView} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const Divider = styled.div`
  width: ${(p) => p.theme.divider.size};
  background: ${(p) => p.theme.divider.background};
`
