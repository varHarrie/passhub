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

    return this.store.groups.insert(group)
  }

  @action
  public async updateGroup (groupId: string, icon: IconType, title: string) {
    return this.store.groups.updateOne({ id: groupId }, { icon, title })
  }

  @action
  public removeGroup (groupId: string) {
    return this.store.groups.removeOne({ id: groupId })
  }

  @action
  public async selectGroup (groupId: string) {
    const index = this.groups.findIndex((group) => group.id === groupId)
    this.group = this.groups[index] || null

    return this.listEntities()
  }

  @action
  public async listEntities () {
    const group = this.group
    this.entries = group ? await this.store.entries.find({ id: group.id }) : []
  }

  @action
  public async addEntity () {
    const group = this.group
    if (!group) return

    const entry = {
      icon: 'File' as IconType,
      title: '',
      description: '',
      id: uuid.v4(),
      groupId: group.id,
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }

    this.store.entries.insert(entry)
  }
}
