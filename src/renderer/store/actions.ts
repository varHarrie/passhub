import * as uuid from 'uuid'
import { useDispatch as originUseDispatch } from 'redux-react-hook'
import { ThunkAction } from 'redux-thunk'

import Database from '../Database'
import { Group } from '../models/group'
import { ActionType, createAction, ThunkDispatch } from './types'
import { IconType } from '../models/base'
import {
  CHANGE_ENTRIES,
  CHANGE_ENTRY,
  CHANGE_FIELDS,
  CHANGE_GROUP,
  CHANGE_GROUPS,
  MODIFY_ENTRY,
  MODIFY_FIELD,
  MODIFY_GROUP
} from './constants'
import { Entry } from '../models/entry'
import { Field, FieldType } from '../models/field'
import { RootState } from '.'

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

function modifyField (index: number, field: Field) {
  return createAction(MODIFY_FIELD, { index, field })
}

export function listGroups () {
  return async (dispatch: ThunkDispatch) => {
    const groups = await Database.instance.groups.find()
    dispatch(changeGroups(groups))
  }
}

export function addGroup (icon: IconType, title: string) {
  return async (dispatch: ThunkDispatch) => {
    const group = await Database.instance.groups.insert({
      icon,
      title,
      id: uuid.v4(),
      createdAt: Date.now(),
      modifiedAt: Date.now()
    })

    await dispatch(listGroups())
    return group
  }
}

export function updateGroup (groupId: string, icon: IconType, title: string) {
  return async (dispatch: ThunkDispatch) => {
    await Database.instance.groups.updateOne({ id: groupId }, { icon, title })
    await dispatch(listGroups())
    dispatch(modifyGroup(groupId, { icon, title }))
  }
}

export function removeGroup (groupId: string) {
  return async (dispatch: ThunkDispatch) => {
    await Database.instance.groups.removeOne({ id: groupId })
    await dispatch(listGroups())
  }
}

export function selectGroup (groupId?: string) {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    const group =
      (groupId && getState().groups.find((g) => g.id === groupId)) || null

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

export function addEntry (): ThunkAction<any, any, any, any> {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    const group = getState().group
    if (!group) return

    const entry = await Database.instance.entries.insert({
      icon: 'File',
      title: 'Untitled',
      description: 'Description',
      fields: [],
      id: uuid.v4(),
      groupId: group.id,
      createdAt: Date.now(),
      modifiedAt: Date.now()
    })

    await dispatch(listEntries())
    return entry
  }
}

export function updateEntry (entryId: string, entryAttrs: Partial<Entry>) {
  return async (dispatch: ThunkDispatch) => {
    await Database.instance.entries.updateOne({ id: entryId }, entryAttrs)
    await dispatch(listEntries())
    dispatch(modifyEntry(entryId, entryAttrs))
  }
}

export function removeEntry (entryId: string) {
  return async (dispatch: ThunkDispatch) => {
    await Database.instance.entries.removeOne({ id: entryId })
    await dispatch(listEntries())
  }
}

export function selectEntry (entryId?: string) {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    const entry =
      (entryId && getState().entries.find((e) => e.id === entryId)) || null

    dispatch(changeEntry(entry))
    await dispatch(listFields())
  }
}

export function listFields () {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    const entry = getState().entry
    const e = entry
      ? await Database.instance.entries.findOne({ id: entry.id }, 'fields')
      : null

    dispatch(changeFields(e ? e.fields : []))
  }
}

export function addField (type: FieldType) {
  return async (dispatch: ThunkDispatch, getState: () => RootState) => {
    const { entry, fields } = getState()
    if (!entry) return

    const field: Field = {
      type,
      id: uuid.v4(),
      entryId: entry.id,
      title: 'Untitled',
      value: '',
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }

    await Database.instance.entries.updateOne(
      { id: entry.id },
      { fields: [...fields, field] }
    )
    await dispatch(listFields())
  }
}

export function updateFieldWithoutSave (index: number, field: Field) {
  return async (dispatch: ThunkDispatch) => {
    dispatch(modifyField(index, field))
  }
}

export const useDispatch = originUseDispatch as (() => ThunkDispatch)

export type Actions =
  | ActionType<typeof changeGroups>
  | ActionType<typeof changeGroup>
  | ActionType<typeof modifyGroup>
  | ActionType<typeof changeEntries>
  | ActionType<typeof changeEntry>
  | ActionType<typeof modifyEntry>
  | ActionType<typeof changeFields>
  | ActionType<typeof modifyField>
