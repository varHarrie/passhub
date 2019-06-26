import { createContext } from 'react'

import { OverlayStore } from '../OverlayProvider'

const ModalContext = createContext<OverlayStore>(null)

export default ModalContext
