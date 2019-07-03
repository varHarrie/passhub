import { Base } from './base'
import { Field } from './field'
import { IconName } from './icon'

export interface Entry extends Base {
  groupId: string
  title: string
  description: string
  icon: IconName
  fields: Field[]
}
