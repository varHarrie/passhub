import { Context, useContext, useEffect } from 'react'
import { __RouterContext, RouteComponentProps } from 'react-router'

import useForceUpdate from './useForceUpdate'

export default function useRouter<P> () {
  const context = useContext((__RouterContext as any) as Context<RouteComponentProps<P>>)
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    return context.history.listen(forceUpdate)
  }, [context])

  return context
}
