import { useCallback, useContext } from 'react'

import Message from '../Message'
import MessageContext from './MessageContext'
import { IconName } from '../../models/icon'

export default function useMessage () {
  const store = useContext(MessageContext)

  return useCallback((icon: IconName, content: string, duration: number = 3000) => {
    store.create(Message, { icon, duration, children: content })
  }, [])
}
