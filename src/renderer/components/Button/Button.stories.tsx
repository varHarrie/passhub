import { storiesOf } from '@storybook/react'
import { boolean, select, text } from '@storybook/addon-knobs'

import Button from '.'
import Icon from '../Icon'

storiesOf('Button', module)
  .add('common', () => (
    <Button solid={boolean('Solid', false)} size={select('Size', ['medium', 'large'], 'medium')}>
      {text('Children', 'Hello World')}
    </Button>
  ))
  .add('with Icon', () => (
    <Button solid={boolean('Solid', false)} size={select('Size', ['medium', 'large'], 'medium')}>
      <Icon name={select('Icon', ['add-line', 'archive-line', 'mail-line'], 'add-line')} />
    </Button>
  ))
