import { observer, useLocalStore } from 'mobx-react-lite'
import { toJS } from 'mobx'

import Message from './Message'
import MessageContext from './MessageContext'
import { styled } from '../../styles'
import { createMessageStore } from './MessageStore'

export interface Props {
  children: React.ReactNode
}

export default observer(function MessageProvider (props: Props) {
  const { children } = props

  const store = useLocalStore(createMessageStore)

  return (
    <MessageContext.Provider value={store.create}>
      {children}
      <Wrapper>
        {store.items.map((item) => (
          <Message
            key={item.id}
            icon={item.icon}
            visible={item.visible}
            duration={item.duration}
            onHide={() => store.hide(item.id)}
            onHidden={() => store.remove(item.id)}
          >
            {item.content}
          </Message>
        ))}
      </Wrapper>
    </MessageContext.Provider>
  )
})

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  pointer-events: none;
`
