import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'

import { app, AppState, entries, entry, group, groups } from './reducers'
import { Group } from '../models/group'
import { Entry } from '../models/entry'

export type RootState = {
  app: AppState
  groups: Group[]
  group: Group | null
  entries: Entry[]
  entry: Entry | null
}

export default function configureStore () {
  const rootReducer = combineReducers<RootState>({
    app,
    groups,
    group,
    entries,
    entry
  })

  return createStore(rootReducer, applyMiddleware(thunk))
}
