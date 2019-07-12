import { useCallback, useEffect, useState, useRef } from 'react'

type Point = {
  x: number
  y: number
}

export default function useDragging (
  ref: React.RefObject<HTMLElement>,
  moveHandler: (e: MouseEvent, startPoint: Point) => void,
  endHandler?: (e: MouseEvent, startPoint: Point) => void
) {
  const [dragging, setDragging] = useState(false)
  const refStartPoint = useRef<Point>({ x: 0, y: 0 })

  const onMove = useCallback(
    (e: MouseEvent) => {
      moveHandler(e, refStartPoint.current)
    },
    [ref.current]
  )

  const onStart = useCallback(
    (e: MouseEvent) => {
      setDragging(true)
      window.getSelection().removeAllRanges()

      refStartPoint.current = {
        x: e.clientX,
        y: e.clientY
      }

      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onEnd)
    },
    [ref.current]
  )

  const onEnd = useCallback(
    (e: MouseEvent) => {
      setDragging(false)

      if (endHandler) {
        endHandler(e, refStartPoint.current)
      }

      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onEnd)
    },
    [ref.current]
  )

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
