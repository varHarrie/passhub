import * as uuid from 'uuid'
import { useDispatch as originUseDispatch } from 'redux-react-hook'

import Database from '../Database'
import { Group } from '../models/group'
import { ActionType, createAction, Dispatch } from './types'
import { IconType } from '../models/base'
import {
  CHANGE_ENTRIES,
  CHANGE_ENTRY,
  CHANGE_FIELDS,
  CHANGE_GROUP,
  CHANGE_GROUPS,
  MODIFY_ENTRY,
  MODIFY_GROUP
} from './constants'
import { Entry } from '../models/entry'
import { Field } from '../models/field'
import { RootState } from '.'

// todo: select由route调用

export function setGroups (groups: Group[]) {
  return createAction(CHANGE_GROUPS, groups)
}

export function setGroup (group: Group | null) {
  return createAction(CHANGE_GROUP, group)
}

export function modifyGroup (groupId: string, groupAttrs: Partial<Group>) {
  return createAction(MODIFY_GROUP, { ...groupAttrs, id: groupId })
}

export function setEntries (entries: Entry[]) {
  return createAction(CHANGE_ENTRIES, entries)
}

export function setEntry (entry: Entry | null) {
  return createAction(CHANGE_ENTRY, entry)
}

export function modifyEntry (entryId: string, entryAttrs: Partial<Entry>) {
  return createAction(MODIFY_ENTRY, { ...entryAttrs, id: entryId })
}

export function setFields (fields: Field[]) {
  return createAction(CHANGE_FIELDS, fields)
}

export function listGroups () {
  return async (dispatch: Dispatch) => {
    const groups = await Database.instance.groups.find()
    dispatch(setGroups(groups))
  }
}

export function addGroup (icon: IconType, title: string) {
  return async (dispatch: Dispatch) => {
    const group = await Database.instance.groups.insert({
      icon,
      title,
      id: uuid.v4(),
      createdAt: Date.now(),
      modifiedAt: Date.now()
    })

    dispatch(listGroups())
    dispatch(setGroup(group))
  }
}

export function updateGroup (groupId: string, icon: IconType, title: string) {
  return async (dispatch: Dispatch) => {
    await Database.instance.groups.updateOne({ id: groupId }, { icon, title })
    dispatch(listGroups())
    dispatch(modifyGroup(groupId, { icon, title }))
  }
}

export function removeGroup (groupId: string) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    await Database.instance.groups.removeOne({ id: groupId })
    dispatch(listGroups())

    const group = getState().group
    if (group && group.id === groupId) {
      dispatch(setGroup(null))
    }
  }
}

export function selectGroup (groupId: string) {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const group = getState().groups.find((g) => g.id === groupId) || null
    dispatch(setGroup(group))
    dispatch(setEntry(null))
    dispatch(listEntries())
  }
}

export function listEntries () {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const group = getState().group
    const entries = group
      ? await Database.instance.entries.find({ groupId: group.id }, '-fields')
      : []

    dispatch(setEntries(entries))
  }
}

export function addEntry () {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const group = getState().group
    if (!group) return

    const entry = await Database.instance.entries.insert({
      icon: 'File' as IconType,
      title: 'Untitled',
      description: 'Description',
      fields: [],
      id: uuid.v4(),
      groupId: group.id,
      createdAt: Date.now(),
      modifiedAt: Date.now()
    })

    dispatch(listEntries())
    dispatch(setEntry(entry))
  }
}

export function updateEntry (entryId: string, entryAttrs: Partial<Entry>) {
  return async (dispatch: Dispatch) => {
    await Database.instance.entries.updateOne({ id: entryId }, entryAttrs)

    dispatch(listEntries())
    dispatch(modifyEntry(entryId, entryAttrs))
  }
}

export function removeEntry (entryId: string) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    await Database.instance.entries.removeOne({ id: entryId })
    dispatch(listEntries())

    const entry = getState().entry
    if (entry && entry.id === entryId) {
      dispatch(setEntry(null))
    }
  }
}

export function selectEntry (entryId: string) {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const entry = getState().entries.find((e) => e.id === entryId) || null
    dispatch(setEntry(entry))
    dispatch(listFields())
  }
}

export function listFields () {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const entry = getState().entry
    const e = entry
      ? await Database.instance.entries.findOne({ id: entry.id }, 'fields')
      : null

    dispatch(setFields(e ? e.fields : []))
  }
}

export const useDispatch = (originUseDispatch as any) as () => Dispatch

export type Actions =
  | ActionType<typeof setGroups>
  | ActionType<typeof setGroup>
  | ActionType<typeof modifyGroup>
  | ActionType<typeof setEntries>
  | ActionType<typeof setEntry>
  | ActionType<typeof modifyEntry>
  | ActionType<typeof setFields>
