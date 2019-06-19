import { FileAdapter } from 'persiston/adapters/file-adapter-sync'
import { Persiston } from 'persiston'

import { Entry } from './models/entry'
import { Group } from './models/group'
import { decrypt, encrypt, md5 } from './libs/crypto'

export default class Database extends Persiston {
  public static instance: Database = null

  private static masterKey: string = ''

  public static async connect (filename: string, masterKey: string) {
    if (!Database.instance) {
      this.masterKey = md5(masterKey)

      const options = {
        serialize: (data: string) => encrypt(JSON.stringify(data), this.masterKey),
        deserialize: (data: string) => JSON.parse(decrypt(data, this.masterKey))
      }

      const adapter = new FileAdapter(filename, options)
      const store = new Database(adapter)

      Database.instance = await store.load()
    }

    return Database.instance
  }

  public static disconnect () {
    Database.instance = null
  }

  public groups = this.collection<Group>('groups')

  public entries = this.collection<Entry>('entries')
}
