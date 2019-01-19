import * as Feather from 'react-feather'

import { Base } from './base'

export interface Entry extends Base {
  groupId: string
  title: string
  description: string
  icon: keyof typeof Feather
}
