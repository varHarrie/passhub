import { toJS } from 'mobx'

import { randomId } from '../../libs/utils'

export interface OverlayOption<T> {
  id: string
  visible: boolean
  Component: React.ComponentType<T>
  payload: T
}

export interface OverlayStore<T = any> {
  items: OverlayOption<T>[]
  create: (Component: React.ComponentType<T>, payload: T) => string
  show: (id: string) => void
  hide: (id: string) => void
  remove: (id: string) => void
}

export function createOverlayStore<T = any> () {
  const store: OverlayStore<T> = {
    items: [],
    create (Component, payload) {
      const id = randomId()
      this.items.push({ id, visible: true, Component, payload })
      return id
    },
    show (id) {
      this.items = this.items.map((item: OverlayOption<T>) =>
        item.id === id ? { ...toJS(item), visible: true } : item
      )
    },
    hide (id) {
      this.items = this.items.map((item: OverlayOption<T>) =>
        item.id === id ? { ...toJS(item), visible: false } : item
      )
    },
    remove (id) {
      this.items = this.items.filter((item: OverlayOption<T>) => item.id !== id)
    }
  }

  return store
}
