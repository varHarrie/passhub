import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'

import Checkbox from '.'
import { action } from '@storybook/addon-actions'

storiesOf('Checkbox', module).add('default', () => (
  <Checkbox checked={boolean('Checked', true)} onChange={action('onChange')}>
    {text('Children', 'Hello World')}
  </Checkbox>
))
