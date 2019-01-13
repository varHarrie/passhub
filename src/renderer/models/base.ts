import * as Feather from 'react-feather'

export interface Base {
  id: string
  createdAt: number
  modifiedAt: number
}

export type IconType = keyof typeof Feather
