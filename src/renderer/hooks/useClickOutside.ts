import * as React from 'react'

export default function useClickOutside (
  ref: React.RefObject<HTMLElement>,
  handler: (e: Event) => void
) {
  React.useEffect(() => {
    if (!ref.current) return

    const onClick = (e: Event) => {
      if (ref.current && ref.current.contains(e.target as HTMLElement)) {
        handler(e)
      }
    }

    document.addEventListener('click', onClick)
    document.addEventListener('touchstart', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('touchstart', onClick)
    }
  }, [])
}
