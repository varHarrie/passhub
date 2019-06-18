import { HashRouter, Route, Switch } from 'react-router-dom'

import WindowActions from './components/WindowActions'
import LoginView from './views/LoginView'
import MainView from './views/MainView'
import { GlobalStyle } from './styles/global'
import { styled, theme, ThemeProvider } from './styles'
import { AppStoreProvider } from './store'

// import { hot } from 'react-hot-loader/root'

export default function App () {
  return (
    <AppStoreProvider>
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
    </AppStoreProvider>
  )
}

// export default hot(App)

const Wrapper = styled.div`
  height: 100%;
  background: ${(p) => p.theme.window.background};
`
