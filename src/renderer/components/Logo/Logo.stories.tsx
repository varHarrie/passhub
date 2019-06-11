import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'

import Logo from '.'

storiesOf('Logo', module).add('common', () => (
  <Logo size={select('Size', ['small', 'large'], 'small')} />
))
