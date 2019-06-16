import { RouteComponentProps } from 'react-router'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import EntryDetailView from './EntryDetailView'
import { styled } from '../../styles'
import { RootState } from '../../store'
import { selectEntry, useDispatch } from '../../store/actions'

const mapState = (state: RootState) => ({
  entry: state.entry
})

export interface Params {
  groupId: string
  entryId: string
  editable?: string
}

export interface Props extends RouteComponentProps<Params> {}

export default function EntryView (props: Props) {
  const { entryId } = props.match.params

  const { entry } = useSelector(mapState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(selectEntry(entryId))
    return () => {
      dispatch(selectEntry())
    }
  }, [entryId])

  return entry ? <EntryDetailView entry={entry} /> : <Empty />
}

const Empty = styled.div``
