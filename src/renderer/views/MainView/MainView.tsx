import * as React from 'react'
import { observer } from 'mobx-react'
import { Route, RouteComponentProps } from 'react-router'

import Sidebar from '../../containers/Sidebar'
import GroupView from '../GroupView'
import { styled } from '../../styles'
import { appStore } from '../../stores'

export interface Props extends RouteComponentProps {}

export interface State {}

@observer
export default class MainView extends React.Component<Props, State> {
  public componentDidMount () {
    if (appStore.initialized) {
      appStore.listGroups()
    } else {
      this.props.history.push('/login')
    }
  }

  public render () {
    if (!appStore.initialized) {
      return null
    }

    return (
      <Wrapper>
        <Sidebar />
        <Divider />
        <Route path='/:id' component={GroupView} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const Divider = styled.div`
  width: ${(p) => p.theme.divider.size};
  background: ${(p) => p.theme.divider.background};
`
