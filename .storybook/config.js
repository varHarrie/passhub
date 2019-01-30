import * as React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { configure, addDecorator } from '@storybook/react'
import { theme, ThemeProvider } from '../src/renderer/styles'
import { GlobalStyle } from '../src/renderer/styles/global'

const req = require.context('../src/renderer/components', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

addDecorator(withKnobs)

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <div style={{ padding: '80px' }}>
      {story()}
      <GlobalStyle />
    </div>
  </ThemeProvider>
))

configure(loadStories, module)
