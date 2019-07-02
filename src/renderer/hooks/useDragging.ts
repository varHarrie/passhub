import { useCallback, useEffect, useState } from 'react'

export default function useDragging (
  ref: React.RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void
) {
  const [dragging, setDragging] = useState(false)

  const onMove = useCallback(
    (e: MouseEvent) => {
      handler(e)
    },
    [ref.current]
  )

  const onStart = useCallback(() => {
    setDragging(true)
    window.getSelection().removeAllRanges()

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)
  }, [ref.current])

  const onEnd = useCallback(() => {
    setDragging(false)

    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onEnd)
  }, [ref.current])

  useEffect(() => {
    const current = ref.current
    if (!current) return

    current.addEventListener('mousedown', onStart)

    return () => {
      current.removeEventListener('mousedown', onStart)
    }
  }, [ref.current])

  return dragging
}
