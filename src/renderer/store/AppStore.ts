import * as uuid from 'uuid'

import Database from '../Database'
import { Group } from '../models/group'
import { Entry } from '../models/entry'
import { IconType } from '../models/base'
import { FieldType } from '../models/field'

export function createAppStore () {
  const store = {
    groups: [] as Group[],

    group: null as Group,

    entries: [] as Entry[],

    entry: null as Entry,

    savingQueue: [] as boolean[],

    get saving () {
      return !!this.savingQueue.length
    },

    async save<T> (process: () => Promise<T>) {
      this.savingQueue.push(true)
      const ret = await process()

      setTimeout(() => {
        this.savingQueue.pop()
      }, 1000)

      return ret
    },

    async listGroups () {
      this.groups = await Database.instance.groups.find()
    },

    async addGroup (icon: IconType, title: string) {
      const group = await this.save(() => {
        return Database.instance.groups.insert({
          icon,
          title,
          id: uuid.v4(),
          createdAt: Date.now(),
          modifiedAt: Date.now()
        })
      })

      await this.listGroups()

      return group
    },

    async updateGroup (groupId: string, icon: IconType, title: string) {
      await this.save(async () => {
        await Database.instance.groups.updateOne({ id: groupId }, { icon, title })
      })

      await this.listGroups()
    },

    async removeGroup (groupId: string) {
      await this.save(async () => {
        await Database.instance.entries.remove({ groupId })
        await Database.instance.groups.removeOne({ id: groupId })
      })

      await this.listGroups()

      if (this.group && this.group.id === groupId) {
        await this.selectGroup()
      }
    },

    async selectGroup (groupId?: string) {
      this.group = groupId ? await Database.instance.groups.findOne({ id: groupId }) : null
      await this.listEntries()
    },

    async listEntries () {
      const groupId = this.group && this.group.id
      this.entries = groupId ? await Database.instance.entries.find({ groupId }, '-fields') : []
    },

    async addEntry () {
      const groupId = this.group && this.group.id
      if (!groupId) return null

      const entry = await this.save(async () => {
        const id = uuid.v4()

        return Database.instance.entries.insert({
          id,
          icon: 'File',
          title: 'Untitled',
          description: '',
          groupId,
          createdAt: Date.now(),
          modifiedAt: Date.now(),
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
          ]
        })
      })

      await this.listEntries()

      return entry
    },

    async updateEntry (entryId: string, entryAttrs: Partial<Entry>) {
      await this.save(async () => {
        if (entryAttrs.fields) {
          const field = entryAttrs.fields.find((f) => f.type === FieldType.text)
          entryAttrs.description = field ? field.value : ''
        }
        await Database.instance.entries.updateOne({ id: entryId }, entryAttrs)
      })

      await this.listEntries()
      await this.selectEntry(entryId)
    },

    async removeEntry (entryId: string) {
      await this.save(async () => {
        await Database.instance.entries.removeOne({ id: entryId })
      })

      await this.listEntries()

      if (this.entry && this.entry.id === entryId) {
        await this.selectEntry()
      }
    },

    async selectEntry (entryId?: string) {
      this.entry = entryId ? await Database.instance.entries.findOne({ id: entryId }) : null
    }
  }

  return store
}

export type AppStore = ReturnType<typeof createAppStore>
