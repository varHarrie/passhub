import { createContext } from 'react'

export type MenuContextValue = {
  (e: React.MouseEvent, payload: any): void
}

const MenuContext = createContext<MenuContextValue>(null)

export default MenuContext
