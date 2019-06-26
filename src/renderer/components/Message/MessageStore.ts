import { toJS } from 'mobx'

import { MessageItem, MessageOption } from './MessageContext'
import { randomId } from '../../libs/utils'

export function createMessageStore () {
  const store = {
    items: [] as MessageItem[],

    create (option: MessageOption) {
      const id = randomId()
      this.items.push({ ...option, id, visible: false, duration: 3000 })
      setTimeout(() => this.show(id), 0)
    },

    show (id: string) {
      this.items = this.items.map((item: MessageItem) =>
        item.id === id ? { ...toJS(item), visible: true } : item
      )
    },

    hide (id: string) {
      this.items = this.items.map((item: MessageItem) =>
        item.id === id ? { ...toJS(item), visible: false } : item
      )
    },

    remove (id: string) {
      this.items = this.items.filter((item: MessageItem) => item.id !== id)
    }
  }

  return store
}

export type MessageStore = ReturnType<typeof createMessageStore>
