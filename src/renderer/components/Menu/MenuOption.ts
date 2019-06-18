import { IconType } from '../../models/base'

export default interface MenuOption<T> {
  icon: IconType
  title: string
  data: T
}
