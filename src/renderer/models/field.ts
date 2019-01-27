import { Base } from './base'

export enum FieldType {
  text = 'TEXT',
  password = 'PASSWORD'
}

export interface Field extends Base {
  entryId: string
  type: FieldType
  title: string
  value: string
}
