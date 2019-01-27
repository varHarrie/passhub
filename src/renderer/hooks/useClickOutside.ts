import * as React from 'react'

export default function useClickOutside (
  ref: React.RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void
) {
  const onClick = React.useCallback((e: MouseEvent) => {
    if (!ref.current || ref.current.contains(e.target as HTMLElement)) return
    handler(e)
  }, [])

  React.useEffect(() => {
    if (!ref.current) return
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [])
}
