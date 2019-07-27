import { storiesOf } from '@storybook/react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Checkbox from '.'

storiesOf('Checkbox', module).add('default', () => (
  <Checkbox
    checked={boolean('Checked', true)}
    size={select('Size', ['small', 'medium', 'large'], 'medium')}
    onChange={action('onChange')}
  >
    {text('Children', 'Hello World')}
  </Checkbox>
))
