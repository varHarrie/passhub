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
    font-size: ${(p) => p.theme.window.fontSize};
    font-family: ${(p) => p.theme.window.fontFamily};
  }

  div, span, form, input, button, label {
    box-sizing: border-box;
  }
`
