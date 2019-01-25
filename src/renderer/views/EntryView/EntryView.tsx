import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import Editor from '../../containers/Editor'
import { styled } from '../../styles'
import { selectEntry, useDispatch } from '../../store/actions'

export interface Props
  extends RouteComponentProps<{ groupId: string; entryId: string }> {}

export default function EntryView (props: Props) {
  const entryId = props.match.params.entryId
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(selectEntry(entryId))
    return () => {
      dispatch(selectEntry())
    }
  }, [entryId])

  return (
    <Wrapper>
      <Editor />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
`
