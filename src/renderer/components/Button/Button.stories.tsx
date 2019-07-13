import { storiesOf } from '@storybook/react'
import { boolean, select, text } from '@storybook/addon-knobs'

import Button from '.'
import Icon from '../Icon'
import { action } from '@storybook/addon-actions'

storiesOf('Button', module)
  .add('default', () => (
    <Button
      solid={boolean('Solid', false)}
      size={select('Size', ['medium', 'large'], 'medium')}
      onClick={action('onClick')}
    >
      {text('Children', 'Hello World')}
    </Button>
  ))
  .add('with Icon', () => (
    <Button
      solid={boolean('Solid', false)}
      size={select('Size', ['medium', 'large'], 'medium')}
      onClick={action('onClick')}
    >
      <Icon name={select('Icon', ['add-line', 'archive-line', 'mail-line'], 'add-line')} />
    </Button>
  ))
