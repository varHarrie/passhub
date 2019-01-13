import * as React from 'react'
import { Provider } from 'mobx-react'
import { RouteComponentProps } from 'react-router'

import Editor from '../../containers/Editor'
import List from '../../containers/List'
import Sidebar from '../../containers/Sidebar'
import { styled } from '../../styles'
import { appStore } from '../../stores'

export interface Props extends RouteComponentProps {}

export interface State {}

export default class MainView extends React.Component<Props, State> {
  public componentDidMount () {
    if (!appStore.initialized) {
      this.props.history.push('/login')
    }
  }

  public render () {
    if (!appStore.initialized) {
      return null
    }

    return (
      <Provider>
        <Wrapper>
          <Sidebar />
          <Divider />
          <List />
          <Divider />
          <Editor />
        </Wrapper>
      </Provider>
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
