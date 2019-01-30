import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import SplitLayout from '.'

storiesOf('SplitLayout', module).add('common', () => (
  <div style={{ height: '300px', border: '1px solid #ddd' }}>
    <SplitLayout
      defaultSize={200}
      size={[number('Min', 100), number('Max', 600)]}
    >
      <div>left</div>
      <div>right</div>
    </SplitLayout>
  </div>
))
