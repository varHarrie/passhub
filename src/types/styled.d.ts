import 'styled-components'

import { Theme } from '../renderer/styles/lightTheme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
