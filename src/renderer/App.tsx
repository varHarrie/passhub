import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import WindowActions from './components/WindowActions'
import { GlobalStyle } from './styles/global'
import { styled, ThemeProvider, theme } from './styles'
import { BrowserRouter, Route } from 'react-router-dom'
import LoginView from './views/LoginView'

export interface Props {}

export interface State {}

class App extends React.Component<Props, State> {
  public render () {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <BrowserRouter>
            <Route path='/' component={LoginView} />
          </BrowserRouter>
          <WindowActions />
          <GlobalStyle />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default hot(App)

const Wrapper = styled.div`
  height: 100%;
  background: ${(p) => p.theme.window.background};
`
