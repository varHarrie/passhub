import { Group } from '../models/group'
import {
  CHANGE_ENTRIES,
  CHANGE_ENTRY,
  CHANGE_FIELDS,
  CHANGE_GROUP,
  CHANGE_GROUPS,
  MODIFY_ENTRY,
  MODIFY_GROUP
} from './constants'
import { Actions } from './actions'
import { Entry } from '../models/entry'
import { Field } from '../models/field'

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

    default:
      return state
  }
}
