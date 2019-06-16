import { useCallback, useState } from 'react'

export default function useToggle (val?: boolean) {
  const [value, setValue] = useState(!!val)

  const onToggle = useCallback(() => {
    setValue((v) => !v)
  }, [])

  return [value, onToggle, setValue] as const
}
