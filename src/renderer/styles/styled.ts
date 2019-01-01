import * as styledComponents from 'styled-components'

import { Theme } from './theme'

type StyledComponents = styledComponents.ThemedStyledComponentsModule<Theme>

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  ThemeConsumer
} = styledComponents as StyledComponents

export {
  styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  ThemeConsumer
}
