import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select, text } from '@storybook/addon-knobs'

import Input from '.'
import Icon from '../Icon'

storiesOf('Input', module)
  .add('common', () => (
    <Input
      solid={boolean('Solid', false)}
      size={select('Size', ['medium', 'large'], 'medium')}
      value={text('Value', 'Hello World')}
      placeholder={text('Placeholder', 'placeholder')}
    />
  ))
  .add('with Icon', () => (
    <Input
      solid={boolean('Solid', false)}
      size={select('Size', ['medium', 'large'], 'medium')}
      value={text('Value', 'Hello World')}
      placeholder={text('Placeholder', 'placeholder')}
      prefix={
        <Icon type={select('Prefix', ['Search', 'Lock', 'Mail'], 'Search')} />}
      suffix={
        <Icon
          type={select('Suffix', ['CornerDownLeft', 'Check', 'Plus'], 'Plus')}
        />
      }
    />
  ))
