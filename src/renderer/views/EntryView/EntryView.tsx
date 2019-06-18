import { RouteComponentProps } from 'react-router'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import EntryDetailView from './EntryDetailView'
import { styled } from '../../styles'
import { useAppStore } from '../../store'

export interface Params {
  groupId: string
  entryId: string
  editable?: string
}

export interface Props extends RouteComponentProps<Params> {}

export default observer(function EntryView (props: Props) {
  const { entryId } = props.match.params

  const store = useAppStore()

  useEffect(() => {
    store.selectEntry(entryId)
    return () => store.selectEntry()
  }, [entryId])

  return store.entry ? <EntryDetailView /> : <Empty />
})

const Empty = styled.div``
