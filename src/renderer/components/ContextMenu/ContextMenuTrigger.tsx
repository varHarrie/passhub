import { cloneElement, isValidElement, useCallback, useContext } from 'react'

import MenuContext from './MenuContext'

export interface Props<T> {
  payload: T
  children: React.ReactNode
}

export default function ContextMenuTrigger<P> (props: Props<P>) {
  const { payload, children } = props
  const onShow = useContext(MenuContext)

  const onContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      onShow(e, payload)
    },
    [payload, onShow]
  )

  return isValidElement(children)
    ? cloneElement(children, { onContextMenu })
    : (children as React.ReactElement)
}
