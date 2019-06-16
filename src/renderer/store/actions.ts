import * as uuid from 'uuid'
import { useDispatch as originUseDispatch } from 'react-redux'

import Database from '../Database'
import { Group } from '../models/group'
import { ActionType, createAction, ThunkDispatch } from './types'
import { IconType } from '../models/base'
import {
  // MODIFY_FIELD,
  CHANGE_ENTRIES,
  CHANGE_ENTRY,
  CHANGE_FIELDS,
  CHANGE_GROUP,
  CHANGE_GROUPS,
  CHANGE_SAVING,
  MODIFY_ENTRY,
  MODIFY_GROUP
} from './constants'
import { Entry } from '../models/entry'
import { Field, FieldType } from '../models/field'
import { RootState } from '.'

function changeSaving (saving: boolean) {
  return createAction(CHANGE_SAVING, saving)
}

function changeGroups (groups: Group[]) {
  return createAction(CHANGE_GROUPS, groups)
}

function changeGroup (group: Group | null) {
  return createAction(CHANGE_GROUP, group)
}

function modifyGroup (groupId: string, groupAttrs: Partial<Group>) {
  return createAction(MODIFY_GROUP, { ...groupAttrs, id: groupId })
}

function changeEntries (entries: Entry[]) {
  return createAction(CHANGE_ENTRIES, entries)
}

function changeEntry (entry: Entry | null) {
  return createAction(CHANGE_ENTRY, entry)
}

function modifyEntry (entryId: string, entryAttrs: Partial<Entry>) {
  return createAction(MODIFY_ENTRY, { ...entryAttrs, id: entryId })
}

function changeFields (fields: Field[]) {
  return createAction(CHANGE_FIELDS, fields)
}

// function modifyField (index: number, field: Field) {
//   return createAction(MODIFY_FIELD, { index, field })
// }

// todo: rewrite
const save = {
  stacks: [] as any[],
  start () {
    this.stacks.push(true)
    return changeSaving(true)
  },
  end () {
    return (dispatch: ThunkDispatch) => {
      setTimeout(() => {
        this.stacks.pop()
        if (this.stacks.length === 0) {
          dispatch(changeSaving(false))
        }
      }, 1000)
    }
  }
}

export function listGroups () {
  return async (dispatch: ThunkDispatch) => {
    const groups = await Database.instance.groups.find()
    dispatch(changeGroups(groups))
  }
}

export function addGroup (icon: IconType, title: string) {
  return async (dispatch: ThunkDispatch) => {
    dispatch(save.start())
    const group = await Database.instance.groups.insert({
      icon,
      title,
      id: uuid.v4(),
      createdAt: Date.now(),
      modifiedAt: Date.now()
    })
    dispatch(save.end())

    await dispatch(listGroups())
    return group
  }
}

export function updateGroup (groupId: string, icon: IconType, title: string) {
  return async (dispatch: ThunkDispatch) => {
    dispatch(save.start())
    await Database.instance.groups.updateOne({ id: groupId }, { icon, title })
    dispatch(save.end())

    await dispatch(listGroups())
    dispatch(modifyGroup(groupId, { icon, title }))
  }
}

export function removeGroup (groupId: string) {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    dispatch(save.start())
    await Database.instance.entries.remove({ groupId })
    await Database.instance.groups.removeOne({ id: groupId })
    dispatch(save.end())

    await dispatch(listGroups())

    const group = getState().group
    if (group && group.id === groupId) {
      dispatch(selectGroup())
    }
  }
}

export function selectGroup (groupId?: string) {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    const group = (groupId && getState().groups.find((g) => g.id === groupId)) || null

    dispatch(changeGroup(group))
    await dispatch(listEntries())
  }
}

export function listEntries () {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    const group = getState().group
    const entries = group
      ? await Database.instance.entries.find({ groupId: group.id }, '-fields')
      : []

    dispatch(changeEntries(entries))
  }
}

export function addEntry () {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    const group = getState().group
    if (!group) return

    dispatch(save.start())

    const id = uuid.v4()
    const entry = await Database.instance.entries.insert({
      id,
      icon: 'File',
      title: 'Untitled',
      description: 'Description',
      fields: [
        {
          type: FieldType.text,
          id: uuid.v4(),
          entryId: id,
          title: 'Username',
          value: '',
          createdAt: Date.now(),
          modifiedAt: Date.now()
        },
        {
          type: FieldType.password,
          id: uuid.v4(),
          entryId: id,
          title: 'Password',
          value: '',
          createdAt: Date.now(),
          modifiedAt: Date.now()
        },
        {
          type: FieldType.text,
          id: uuid.v4(),
          entryId: id,
          title: 'Website',
          value: '',
          createdAt: Date.now(),
          modifiedAt: Date.now()
        },
        {
          type: FieldType.text,
          id: uuid.v4(),
          entryId: id,
          title: 'Note',
          value: '',
          createdAt: Date.now(),
          modifiedAt: Date.now()
        }
      ],
      groupId: group.id,
      createdAt: Date.now(),
      modifiedAt: Date.now()
    })
    dispatch(save.end())

    await dispatch(listEntries())
    return entry
  }
}

export function updateEntry (entryId: string, entryAttrs: Partial<Entry>) {
  return async (dispatch: ThunkDispatch) => {
    dispatch(save.start())
    await Database.instance.entries.updateOne({ id: entryId }, entryAttrs)
    dispatch(save.end())

    await dispatch(listEntries())
    dispatch(modifyEntry(entryId, entryAttrs))
  }
}

export function removeEntry (entryId: string) {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    dispatch(save.start())
    await Database.instance.entries.removeOne({ id: entryId })
    dispatch(save.end())

    await dispatch(listEntries())

    const entry = getState().entry
    if (entry && entry.id === entryId) {
      dispatch(selectEntry())
    }
  }
}

export function selectEntry (entryId?: string) {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    const entry = await Database.instance.entries.findOne({ id: entryId })
    dispatch(changeEntry(entry))
  }
}

// export function listFields () {
//   return async (dispatch: ThunkDispatch, getState: () => RootState) => {
//     const entry = getState().entry
//     const e = entry ? await Database.instance.entries.findOne({ id: entry.id }, 'fields') : null

//     dispatch(changeFields(e ? e.fields : []))
//   }
// }

// export function addField (type: FieldType) {
//   return async (dispatch: ThunkDispatch, getState: () => RootState) => {
//     const { entry, fields } = getState()
//     if (!entry) return

//     const field: Field = {
//       type,
//       id: uuid.v4(),
//       entryId: entry.id,
//       title: '',
//       value: '',
//       createdAt: Date.now(),
//       modifiedAt: Date.now()
//     }

//     dispatch(save.start())
//     await Database.instance.entries.updateOne({ id: entry.id }, { fields: [...fields, field] })
//     dispatch(save.end())

//     await dispatch(listFields())
//   }
// }

// export function updateFieldWithoutSave (index: number, field: Field) {
//   return (dispatch: ThunkDispatch) => {
//     dispatch(modifyField(index, field))
//   }
// }

// export function removeFieldWithoutSave (fieldId: string) {
//   return (dispatch: ThunkDispatch, getState: () => RootState) => {
//     const fields = getState().fields.filter((f) => f.id !== fieldId)
//     dispatch(changeFields(fields))
//   }
// }

// export function saveFields (entryId: string) {
//   return async (dispatch: ThunkDispatch, getState: () => RootState) => {
//     const fields = getState().fields

//     dispatch(save.start())
//     await Database.instance.entries.updateOne({ id: entryId }, { fields })
//     dispatch(save.end())
//   }
// }

export const useDispatch = originUseDispatch as (() => ThunkDispatch)

export type Actions =
  | ActionType<typeof changeSaving>
  | ActionType<typeof changeGroups>
  | ActionType<typeof changeGroup>
  | ActionType<typeof modifyGroup>
  | ActionType<typeof changeEntries>
  | ActionType<typeof changeEntry>
  | ActionType<typeof modifyEntry>
  | ActionType<typeof changeFields>
// | ActionType<typeof modifyField>
