import { storiesOf } from '@storybook/react'

import ContextMenu from '.'
import { MenuOption } from '../Menu'
import { action } from '@storybook/addon-actions'

const menu: MenuOption<any>[] = [
  { icon: 'add-line', title: 'Add', data: 'add' },
  { icon: 'pencil-line', title: 'Edit', data: 'edit' },
  { icon: 'delete-bin-line', title: 'Remove', data: 'remove' }
]

const items = [{ id: 1, title: 'Item 1' }, { id: 2, title: 'Item 2' }, { id: 3, title: 'Item 3' }]

storiesOf('ContextMenu', module).add('default', () => (
  <div>
    <div>Right Click Here:</div>
    <ContextMenu options={menu} onClick={action('onMenuClick')}>
      {items.map((item) => (
        <ContextMenu.Trigger key={item.id} payload={item.id}>
          <div>{item.title}</div>
        </ContextMenu.Trigger>
      ))}
    </ContextMenu>
  </div>
))
