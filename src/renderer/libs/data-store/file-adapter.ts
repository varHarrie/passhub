import * as fs from 'fs'

import { Adapter } from './data-store'
import { noop } from '../utils'

export interface FileAdapterOptions<T> {
  initialValues: T
  serialize: (data: T) => string
  deserialize: (data: string) => T
}

export class FileAdapter<T = any> implements Adapter<T> {
  private filename: string

  private initialValues: T

  private serialize: (data: T) => string

  private deserialize: (data: string) => T

  public constructor (filename: string, options: FileAdapterOptions<T>) {
    this.filename = filename
    this.initialValues = options.initialValues || ({} as any)
    this.serialize = options.serialize || noop
    this.deserialize = options.deserialize || noop
  }

  public read () {
    if (this.isFileExisted(this.filename)) {
      try {
        const data = fs.readFileSync(this.filename, 'utf8').trim()
        return data ? this.deserialize(data) : this.initialValues
      } catch (error) {
        throw new Error(
          `Could not read file ${this.filename}: ${error.message}`
        )
      }
    } else {
      this.write(this.initialValues)
      return this.initialValues
    }
  }

  public write (data: T) {
    try {
      fs.writeFileSync(this.filename, this.serialize(data), 'utf8')
    } catch (error) {
      throw new Error(`Could not write file ${this.filename}: ${error.message}`)
    }
  }

  private isFileExisted (filename: string) {
    try {
      const stat = fs.statSync(this.filename)
      return stat.isFile()
    } catch (error) {
      return false
    }
  }
}
