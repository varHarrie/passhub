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
  public initialize () {
    try {
      this.store = PasshubStore.connect('./data.json')
    } catch (error) {
      console.error(error)
    }
  }

  @action
  public listGroup () {
    this.groups = this.store.groups.find()
  }

  @action
  public addGroup (icon: IconType, title: string) {
    const group: Group = {
      icon,
      title,
      id: uuid.v4(),
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }

    this.store.groups.insert(group)
    this.groups.push(group)
    this.group = group
  }

  @action
  public removeGroup (id: string) {
    this.groups = this.groups.filter((group) => group.id !== id)

    if (this.group && this.group.id === id) {
      this.selectGroup(id)
    }
  }

  @action
  public selectGroup (id: string) {
    const index = this.groups.findIndex((group) => group.id === id)
    this.group = this.groups[index] || null

    if (!this.group) return
  }
}
