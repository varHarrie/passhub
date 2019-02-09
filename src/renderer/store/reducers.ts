import { Group } from '../models/group'
import {
  CHANGE_ENTRIES,
  CHANGE_ENTRY,
  CHANGE_FIELDS,
  CHANGE_GROUP,
  CHANGE_GROUPS,
  CHANGE_SAVING,
  MODIFY_ENTRY,
  MODIFY_FIELD,
  MODIFY_GROUP
} from './constants'
import { Actions } from './actions'
import { Entry } from '../models/entry'
import { Field } from '../models/field'

export type AppState = {
  saving: boolean
}

const initialAppState: AppState = {
  saving: false
}

export const app = (state: AppState = initialAppState, action: Actions) => {
  switch (action.type) {
    case CHANGE_SAVING:
      return { ...state, saving: action.payload }

    default:
      return state
  }
}

export const groups = (state: Group[] = [], action: Actions) => {
  switch (action.type) {
    case CHANGE_GROUPS:
      return action.payload

    default:
      return state
  }
}

export const group = (state: Group | null = null, action: Actions) => {
  switch (action.type) {
    case CHANGE_GROUP:
      return action.payload

    case MODIFY_GROUP:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const entries = (state: Entry[] = [], action: Actions) => {
  switch (action.type) {
    case CHANGE_ENTRIES:
      return action.payload

    default:
      return state
  }
}

export const entry = (state: Entry | null = null, action: Actions) => {
  switch (action.type) {
    case CHANGE_ENTRY:
      return action.payload

    case MODIFY_ENTRY:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export const fields = (state: Field[] = [], action: Actions) => {
  switch (action.type) {
    case CHANGE_FIELDS:
      return action.payload

    case MODIFY_FIELD:
      const newFields = [...state]
      newFields.splice(action.payload.index, 1, action.payload.field)
      return newFields

    default:
      return state
  }
}
