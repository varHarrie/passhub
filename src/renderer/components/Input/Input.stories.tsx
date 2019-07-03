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
      prefix={<Icon name={select('Prefix', ['search', 'lock', 'mail'], 'search')} />}
      suffix={<Icon name={select('Suffix', ['arrow-left', 'check', 'add'], 'add')} />}
    />
  ))
