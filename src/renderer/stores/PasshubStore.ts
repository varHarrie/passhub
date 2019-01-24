import { FileAdapter } from 'persiston/adapters/file-adapter'
import { Persiston } from 'persiston'

import { Entry } from '../models/entry'
import { Group } from '../models/group'

export default class PasshubStore extends Persiston {
  public static connect (filename: string) {
    const adapter = new FileAdapter(filename)
    const store = new PasshubStore(adapter)

    return store.load()
  }

  public groups = this.collection<Group>('groups')

  public entries = this.collection<Entry>('entries')
}
