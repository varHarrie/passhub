import { IconName } from '../../models/icon'

export default interface MenuOption<T> {
  icon: IconName
  title: string
  data: T
}
