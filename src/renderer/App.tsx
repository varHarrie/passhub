import { Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'

import HashRouter from './components/HashRouter'
import ImageViewer from './components/ImageViewer'
import MessageProvider from './components/MessageProvider'
import ModalProvider from './components/ModalProvider'
import WindowActions from './components/WindowActions'
import LoginView from './views/LoginView'
import MainView from './views/MainView'
import { GlobalStyle } from './styles/global'
import { styled, theme, ThemeProvider } from './styles'
import { AppStoreProvider } from './store'
import { loadI18n } from './libs/i18n'

// import { hot } from 'react-hot-loader/root'

export default function App () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadI18n('en').then(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <AppStoreProvider>
      <ThemeProvider theme={theme}>
        <MessageProvider>
          <ModalProvider>
            <ImageViewer>
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
            </ImageViewer>
          </ModalProvider>
        </MessageProvider>
      </ThemeProvider>
    </AppStoreProvider>
  )
}

// export default hot(App)

const Wrapper = styled.div`
  height: 100%;
  background: ${(p) => p.theme.window.background};
`
