import * as uuid from 'uuid'
import { action, observable } from 'mobx'

import PasshubStore from './PasshubStore'
import { Group } from '../models/group'
import { Entry } from '../models/entry'
import { IconType } from '../models/base'
import { Field } from '../models/field'

export default class AppStore {
  private store: PasshubStore = null!

  @observable
  public groups: Group[] = []

  @observable
  public entries: Entry[] = []

  @observable
  public fields: Field[] = []

  @observable
  public group: Group | null = null

  @observable
  public entry: Entry | null = null

  public get initialized () {
    return !!this.store
  }

  @action
  public async initialize () {
    this.store = await PasshubStore.connect('./data.json')
  }

  @action
  public async listGroups () {
    this.groups = await this.store.groups.find()
  }

  @action
  public async addGroup (icon: IconType, title: string) {
    const group = {
      icon,
      title,
      id: uuid.v4(),
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }

    await this.store.groups.insert(group)
    await this.listGroups()

    return group
  }

  @action
  public async updateGroup (groupId: string, icon: IconType, title: string) {
    await this.store.groups.updateOne({ id: groupId }, { icon, title })
    await this.listGroups()
  }

  @action
  public async removeGroup (groupId: string) {
    await this.store.groups.removeOne({ id: groupId })
    await this.listGroups()
  }

  @action
  public async selectGroup (groupId: string) {
    const index = this.groups.findIndex((group) => group.id === groupId)
    this.group = this.groups[index] || null

    return this.listEntries()
  }

  @action
  public async listEntries () {
    this.entries = this.group
      ? await this.store.entries.find({ groupId: this.group.id }, '-fields')
      : []
  }

  @action
  public async addEntry () {
    const group = this.group
    if (!group) return

    const entry = {
      icon: 'File' as IconType,
      title: 'Title',
      description: 'Description',
      fields: [],
      id: uuid.v4(),
      groupId: group.id,
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }

    await this.store.entries.insert(entry)
    await this.listEntries()

    return entry
  }

  @action
  public async updateEntry (entryId: string, entryAttrs: Partial<Entry>) {
    await this.store.entries.updateOne({ id: entryId }, entryAttrs)
    await this.listEntries()
  }

  @action
  public async selectEntry (entryId: string) {
    const index = this.entries.findIndex((entry) => entry.id === entryId)
    this.entry = this.entries[index] || null

    return this.listFields()
  }

  @action
  public async listFields () {
    const entryId = this.entry && this.entry.id
    const entry = entryId
      ? await this.store.entries.findOne({ id: entryId }, 'fields')
      : null

    this.fields = entry ? entry.fields : []
  }
}
