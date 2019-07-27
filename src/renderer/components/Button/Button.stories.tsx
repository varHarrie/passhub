import { storiesOf } from '@storybook/react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Button from '.'
import Icon from '../Icon'

storiesOf('Button', module)
  .add('default', () => (
    <Button
      solid={boolean('Solid', false)}
      size={select('Size', ['small', 'medium', 'large'], 'medium')}
      onClick={action('onClick')}
    >
      {text('Children', 'Hello World')}
    </Button>
  ))
  .add('with Icon', () => (
    <Button
      solid={boolean('Solid', false)}
      size={select('Size', ['small', 'medium', 'large'], 'medium')}
      onClick={action('onClick')}
    >
      <Icon name={select('Icon', ['add-line', 'archive-line', 'mail-line'], 'add-line')} />
    </Button>
  ))
