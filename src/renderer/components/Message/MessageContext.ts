import { createContext } from 'react'

import { IconType } from '../../models/base'

export interface MessageOption {
  icon: IconType
  content: string
}

export interface MessageItem extends MessageOption {
  id: string
  visible: boolean
  duration: number
}

export interface MessageContextValue {
  (option: MessageOption): void
}

const MessageContext = createContext<MessageContextValue>(null)

export default MessageContext
