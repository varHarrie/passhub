import { Collection } from './collection'

export type Collections = {
  [key: string]: any[]
}

export interface Adapter<T = any> {
  read: () => T
  write: (data: T) => void
}

export class DataStore {
  private adapter: Adapter

  private data: { [key: string]: any[] }

  public constructor (adapter: Adapter) {
    this.adapter = adapter
    this.data = adapter.read()
  }

  public collection (name: string) {
    if (!this.data[name]) this.data[name] = []
    return new Collection(this.data[name], this.save.bind(this))
  }

  public save () {
    this.adapter.write(this.data)
  }
}
