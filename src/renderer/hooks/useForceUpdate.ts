import { useCallback, useState } from 'react'

export default function useForceUpdate () {
  const [, setState] = useState(false)

  const forceUpdate = useCallback(() => {
    setState((b) => !b)
  }, [])

  return forceUpdate
}
