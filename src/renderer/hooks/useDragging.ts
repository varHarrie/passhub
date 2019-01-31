import * as React from 'react'

export default function useDragging (
  ref: React.RefObject<HTMLElement>,
  handler: (e: MouseEvent | TouchEvent) => void
) {
  const [dragging, setDragging] = React.useState(false)

  const onMove = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      handler(e)
    },
    [ref.current]
  )

  const onStart = React.useCallback(() => {
    setDragging(true)
    window.getSelection().removeAllRanges()

    document.addEventListener('mousemove', onMove)
    document.addEventListener('touchmove', onMove)
    document.addEventListener('mouseup', onEnd)
    document.addEventListener('touchend', onEnd)
  }, [ref.current])

  const onEnd = React.useCallback(() => {
    setDragging(false)

    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('touchmove', onMove)
    document.removeEventListener('mouseup', onEnd)
    document.removeEventListener('touchend', onEnd)
  }, [ref.current])

  React.useEffect(() => {
    const current = ref.current
    if (!current) return

    current.addEventListener('mousedown', onStart)
    current.addEventListener('touchstart', onStart)

    return () => {
      current.removeEventListener('mousedown', onStart)
      current.removeEventListener('touchstart', onStart)
    }
  }, [ref.current])

  return dragging
}
