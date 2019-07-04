import { useEffect } from 'react'
import useRouter from './useRouter'
import { TransitionPromptHook } from 'history'

export default function usePrompt (when: boolean, message: string | TransitionPromptHook) {
  const router = useRouter()

  useEffect(() => {
    if (when) {
      return router.history.block(message)
    }
  }, [when, message])
}
