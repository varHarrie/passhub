import { useEffect } from 'react'

export default function useClickOutside (el: HTMLElement | null, handler: (e: Event) => void) {
  useEffect(() => {
    if (!el) return

    const onClick = (e: Event) => {
      if (el && !el.contains(e.target as HTMLElement)) {
        handler(e)
      }
    }

    document.addEventListener('click', onClick)
    document.addEventListener('touchstart', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('touchstart', onClick)
    }
  }, [el, handler])
}
