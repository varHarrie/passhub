import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { StoreContext } from 'redux-react-hook'

import WindowActions from './components/WindowActions'
import configureStore from './store'
import LoginView from './views/LoginView'
import MainView from './views/MainView'
import { GlobalStyle } from './styles/global'
import { styled, theme, ThemeProvider } from './styles'

// import { hot } from 'react-hot-loader/root'

export interface Props {}

export default function App (props: Props) {
  const store = configureStore()

  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Wrapper>
            <Switch>
              <Route path='/login' component={LoginView} />
              <Route path='/' component={MainView} />
            </Switch>
            <WindowActions />
            <GlobalStyle />
          </Wrapper>
        </HashRouter>
      </ThemeProvider>
    </StoreContext.Provider>
  )
}

// export default hot(App)

const Wrapper = styled.div`
  height: 100%;
  background: ${(p) => p.theme.window.background};
`
