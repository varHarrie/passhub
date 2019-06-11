import { storiesOf } from '@storybook/react'
import { select, text } from '@storybook/addon-knobs'

import Menu from '.'

storiesOf('Menu', module).add('common', () => (
  <Menu>
    <Menu.Item
      icon={select('Icon', ['Plus', 'Archive', 'Mail'], 'Plus')}
      title={text('Title', 'Add')}
    />
    <Menu.Item icon='Edit2' title='Edit' />
    <Menu.Item icon='Trash' title='Remove' />
  </Menu>
))
