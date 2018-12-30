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

  div, span, form, input, button, label {
    box-sizing: border-box;
  }
`
