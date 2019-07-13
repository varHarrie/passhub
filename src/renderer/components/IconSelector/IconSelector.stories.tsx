import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { boolean, select } from '@storybook/addon-knobs'

import IconSelector from '.'
import Button from '../Button'
import { Position } from '../Popup/Popup'

const position: Position[] = ['top-start', 'top-end', 'bottom-start', 'bottom-end']

storiesOf('IconSelector', module).add('default', () => (
  <IconSelector
    value='account-box-line'
    disabled={boolean('Boolean', false)}
    position={select('Position', position, 'bottom-start')}
    onChange={action('onChange')}
  >
    <Button>Click Here!</Button>
  </IconSelector>
))
