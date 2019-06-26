import { createContext } from 'react'

import { OverlayStore } from '../OverlayProvider'

const MessageContext = createContext<OverlayStore>(null)

export default MessageContext
