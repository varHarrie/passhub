import { createGlobalStyle } from 'styled-components'

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
    font-size: ${(p) => p.theme.fontSize};
    font-family: ${(p) => p.theme.fontFamily};
  }

  div, span, form, input, button, label {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
    cursor: pointer;

    &:hover {
      background: #aaa;
    }
  }
`
