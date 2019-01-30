import * as React from 'react'

export default function useDragging (
  ref: React.RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void
) {
  const refDragging = React.useRef(false)

  React.useEffect(() => {
    if (!ref.current) return

    const onMouseDown = () => {
      refDragging.current = true

      if (window.getSelection) {
        window.getSelection().removeAllRanges()
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!refDragging.current) return
      handler(e)
    }

    const onMouseUp = () => {
      if (!refDragging.current) return
      refDragging.current = false
    }

    ref.current.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousedown', onMouseDown)
      }

      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])
}
