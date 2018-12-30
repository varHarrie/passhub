import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import WindowActions from './components/WindowActions'
import { GlobalStyle } from './styles/global'
import { styled, ThemeProvider, theme } from './styles'

export interface Props {}

export interface State {}

class App extends React.Component<Props, State> {
  public render () {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
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
