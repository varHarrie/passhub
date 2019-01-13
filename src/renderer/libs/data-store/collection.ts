import { deepCopy, match, toPairs } from './utils'

export interface Query {
  [key: string]: any
}

export class Collection<T> {
  private readonly collection: T[]

  private onSave: () => void

  public constructor (collection: T[], onSave: () => void) {
    this.collection = collection
    this.onSave = onSave
  }

  public find (query?: Query): T[] {
    const pairs = toPairs(query)
    const results = pairs.length
      ? this.collection.filter((item) => match(item, pairs))
      : this.collection

    return results.map(deepCopy)
  }

  public findOne (query?: Query): T | null {
    const pairs = toPairs(query)
    const result = pairs.length
      ? this.collection.find((item) => match(item, pairs))
      : this.collection[0]

    return deepCopy(result || null)
  }

  public insert (item: T): T {
    this.collection.push(deepCopy(item))
    this.onSave()
    return deepCopy(item)
  }

  public update (query: Query, changes: Partial<T>): number {
    const results = this.find(query)

    results.forEach((item) => {
      Object.assign(item, changes)
    })

    this.onSave()
    return results.length
  }

  public updateOne (query: Query, changes: Partial<T>): number {
    const result = this.findOne(query)
    if (!result) return 0

    Object.assign(result, changes)
    this.onSave()
    return 1
  }

  public remove (query?: Query): number {
    const pairs = toPairs(query)

    if (!pairs.length) {
      const count = this.collection.length
      this.collection.length = 0

      if (count) this.onSave()
      return count
    }

    const indexes: number[] = []

    this.collection.forEach((item, index) => {
      if (match(item, pairs)) indexes.push(index)
    })

    indexes.reverse().forEach((index) => {
      this.collection.splice(index, 1)
    })

    if (indexes.length) this.onSave()
    return indexes.length
  }

  public removeOne (query: Query): number {
    const pairs = toPairs(query)
    const index = this.collection.findIndex((item) => match(item, pairs))

    if (index === -1) return 0

    this.collection.splice(index, 1)
    this.onSave()
    return 1
  }
}
