import styled from 'styled-components'
import { observer, useLocalStore } from 'mobx-react-lite'

import { createOverlayStore } from './OverlayStore'

export interface Props {
  className?: string
  context: React.Context<any>
  children: React.ReactNode
}

export default observer(function OverlayProvider (props: Props) {
  const { className, context, children } = props

  const store = useLocalStore(createOverlayStore)

  return (
    <context.Provider value={store}>
      {children}
      <Wrapper className={className}>
        {store.items.map(({ id, Component, visible, payload }) => (
          <Component
            {...payload}
            key={id}
            visible={visible}
            onHide={() => store.hide(id)}
            onHidden={() => store.remove(id)}
          />
        ))}
      </Wrapper>
    </context.Provider>
  )
})

const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
`
