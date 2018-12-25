import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import { GlobalStyle } from './styles/global'
import { styled } from './styles'

export interface Props {}

export interface State {}

class App extends React.Component<Props, State> {
  public render () {
    return (
      <Wrapper>
        <GlobalStyle />
        <div>Hello world</div>
      </Wrapper>
    )
  }
}

export default hot(App)

const Wrapper = styled.div``
