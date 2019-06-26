import { useCallback, useContext } from 'react'

import Message from '../Message'
import MessageContext from './MessageContext'
import { IconType } from '../../models/base'

export default function useMessage () {
  const store = useContext(MessageContext)

  return useCallback((icon: IconType, content: string, duration: number = 3000) => {
    store.create(Message, { icon, duration, children: content })
  }, [])
}
