import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'

import { entries, entry, fields, group, groups } from './reducers'
import { Group } from '../models/group'
import { Entry } from '../models/entry'
import { Field } from '../models/field'

export type PasshubState = any

export type RootState = {
  groups: Group[]
  group: Group | null
  entries: Entry[]
  entry: Entry | null
  fields: Field[]
}

export const rootReducer = combineReducers<RootState>({
  groups,
  group,
  entries,
  entry,
  fields
})

export default createStore(rootReducer, applyMiddleware(thunk))
