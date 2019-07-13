import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import DropdownMenu from '.'
import Button from '../Button'
import { Position } from './DropdownMenu'
import { MenuOption } from '../Menu'

const menu: MenuOption<any>[] = [
  { icon: 'add-line', title: 'Add', data: 'add' },
  { icon: 'pencil-line', title: 'Edit', data: 'edit' },
  { icon: 'delete-bin-line', title: 'Remove', data: 'remove' }
]

const position: Position[] = ['top-start', 'top-end', 'bottom-start', 'bottom-end']

storiesOf('DropdownMenu', module).add('default', () => (
  <DropdownMenu
    items={menu}
    position={select('Position', position, 'bottom-start')}
    onClick={action('onMenuClick')}
  >
    <Button>Click Here!</Button>
  </DropdownMenu>
))
