import { withKnobs } from '@storybook/addon-knobs'
import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'

import { lightTheme } from '../src/renderer/styles/lightTheme'
import { GlobalStyle } from '../src/renderer/styles/global'

const req = require.context('../src/renderer/components', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

addDecorator(withKnobs)

addDecorator((story) => (
  <ThemeProvider theme={lightTheme}>
    <div style={{ padding: '80px' }}>
      {story()}
      <GlobalStyle />
    </div>
  </ThemeProvider>
))

configure(loadStories, module)
