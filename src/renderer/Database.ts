import { FileAdapter } from 'persiston/adapters/file-adapter'
import { Persiston } from 'persiston'

import { Entry } from './models/entry'
import { Group } from './models/group'

export default class Database extends Persiston {
  public static instance: Database = null!

  public static async connect (filename: string) {
    if (!Database.instance) {
      const adapter = new FileAdapter(filename)
      const store = new Database(adapter)

      Database.instance = await store.load()
    }

    return Database.instance
  }

  public static disconnect () {
    Database.instance = null!
  }

  public groups = this.collection<Group>('groups')

  public entries = this.collection<Entry>('entries')
}
