import { Base } from './base'
import * as Feather from 'react-feather'

export interface Entry extends Base {
  groupId: string
  icon: keyof typeof Feather
}
