import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import Icon from '.'
import { styled } from '../../styles'

const Item = styled.span<{ color: string }>`
  display: inline-block;
  margin: 6px;
  color: ${(p) => p.color};
`

// todo:
const icons = ['admin']

storiesOf('Icon', module).add('common', () => (
  <>
    {icons.map((icon: any) => (
      <Item key={icon} color={text('Color', '#999')}>
        <Icon name={icon} />
      </Item>
    ))}
  </>
))
