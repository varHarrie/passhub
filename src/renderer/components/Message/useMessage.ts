import { useContext } from 'react'

import MessageContext from './MessageContext'

export default function useMessage () {
  return useContext(MessageContext)
}
