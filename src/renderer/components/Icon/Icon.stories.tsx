import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import Icon from '.'
import { styled } from '../../styles'
import { FILLED_ICON_NAMES, NORMAL_ICON_NAMES, OUTLINED_ICON_NAMES } from '../../models/icon'

const Item = styled.span<{ color: string }>`
  display: inline-block;
  margin: 6px;
  color: ${(p) => p.color};
`

storiesOf('Icon', module).add('common', () => (
  <div>
    <section>
      <h3>Normal</h3>
      <div>
        {NORMAL_ICON_NAMES.map((icon: any) => (
          <Item key={icon} color={text('Color', '#999')}>
            <Icon name={icon} />
          </Item>
        ))}
      </div>
    </section>
    <section>
      <h3>Outlined</h3>
      <div>
        {OUTLINED_ICON_NAMES.map((icon: any) => (
          <Item key={icon} color={text('Color', '#999')}>
            <Icon name={icon} />
          </Item>
        ))}
      </div>
    </section>
    <section>
      <h3>Filled</h3>
      <div>
        {FILLED_ICON_NAMES.map((icon: any) => (
          <Item key={icon} color={text('Color', '#999')}>
            <Icon name={icon} />
          </Item>
        ))}
      </div>
    </section>
  </div>
))
