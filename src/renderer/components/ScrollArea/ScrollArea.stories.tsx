import { storiesOf } from '@storybook/react'

import ScrollArea from '.'

storiesOf('ScrollArea', module).add('common', () => (
  <div style={{ height: '300px', border: '1px solid #ddd' }}>
    <ScrollArea>
      <div
        dangerouslySetInnerHTML={{
          __html: `Hello${Array.from({ length: 30 })
            .map(() => '<br/>')
            .join('')}World`
        }}
      />
    </ScrollArea>
  </div>
))
