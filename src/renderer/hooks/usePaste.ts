import { useEffect } from 'react'

export default function usePaste (handler: (e: ClipboardEvent) => void, inputs: any[]) {
  useEffect(() => {
    document.addEventListener('paste', handler)

    return () => {
      document.removeEventListener('paste', handler)
    }
  }, [inputs])
}
