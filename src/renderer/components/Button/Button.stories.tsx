import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select, text } from '@storybook/addon-knobs'

import Button from '.'
import Icon from '../Icon'

storiesOf('Button', module)
  .add('common', () => (
    <Button
      solid={boolean('Solid', false)}
      size={select('Size', ['medium', 'large'], 'medium')}
    >
      {text('Children', 'Hello World')}
    </Button>
  ))
  .add('with Icon', () => (
    <Button
      solid={boolean('Solid', false)}
      size={select('Size', ['medium', 'large'], 'medium')}
    >
      <Icon type={select('Icon', ['Plus', 'Archive', 'Mail'], 'Plus')} />
    </Button>
  ))
