import {
  ThunkAction as OriginalThunkAction,
  ThunkDispatch as OriginalThunkDispatch
} from 'redux-thunk'

export type Action<T extends string, P = undefined, M = undefined> = {
  type: T
  payload?: P
  meta?: M
}

export type ActionCreator<T extends string, P = undefined, M = undefined> = (
  ...args: any[]
) => Action<T, P, M>

export type ActionType<F> = F extends ActionCreator<infer T, infer P, infer M>
  ? { type: T; payload: P; meta: M }
  : never

export function createAction<T extends string, P = undefined, M = undefined> (
  type: T,
  payload?: P,
  meta?: M
) {
  return { type, payload, meta }
}

export type ThunkAction<R> = OriginalThunkAction<R, any, any, any>

export type ThunkDispatch = <A>(
  action: A
) => A extends ThunkAction<infer R> ? R : A
