import { Entry } from '../models/entry'
import { Group } from '../models/group'
import { Collection, DataStore, FileAdapter } from '../libs/data-store'

export default class PasshubStore extends DataStore {
  public static connect (filename: string) {
    const adapter = new FileAdapter(filename, {
      initialValues: {},
      serialize: JSON.stringify,
      deserialize: JSON.parse
    })
    return new PasshubStore(adapter)
  }

  public groups: Collection<Group> = this.collection('groups')

  public entries: Collection<Entry> = this.collection('entries')

  public fields: Collection<Entry> = this.collection('fields')
}
