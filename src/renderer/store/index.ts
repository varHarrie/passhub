import { createContext, createElement, useContext } from 'react'
import { useLocalStore } from 'mobx-react-lite'

import { AppStore, createAppStore } from './AppStore'

const AppStoreContext = createContext<AppStore>(null)

interface Props {
  children: React.ReactNode
}

export function AppStoreProvider (props: Props) {
  const store = useLocalStore(createAppStore)
  return createElement(AppStoreContext.Provider, { value: store }, props.children)
}

export function useAppStore () {
  return useContext(AppStoreContext)
}
