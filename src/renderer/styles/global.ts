import { createGlobalStyle } from './styled'

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
  }

  #root {
    height: 100%;
  }

  div, span, input, button, form {
    box-sizing: border-box;
  }
`
