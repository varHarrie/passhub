import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useMappedState } from 'redux-react-hook'

import Button from '../../components/Button'
import EntryItem from '../../components/EntryItem'
import Icon from '../../components/Icon'
import Input from '../../components/Input'
import ScrollArea from '../../components/ScrollArea'
import { styled } from '../../styles'
import { Entry } from '../../models/entry'
import { addEntry, selectEntry, useDispatch } from '../../store/actions'
import { RootState } from '../../store'

export interface Props extends RouteComponentProps<{ groupId: string }> {}

function EntryList (props: Props) {
  const mapState = React.useCallback(
    (state: RootState) => ({
      entries: state.entries,
      entry: state.entry
    }),
    []
  )

  const groupId = props.match.params.groupId
  const { entries, entry } = useMappedState(mapState)
  const dispatch = useDispatch()

  const onEntryAdd = React.useCallback(() => {
    // todo: scroll to end
    dispatch(addEntry())
  }, [])

  const onEntrySelect = React.useCallback(
    (e: Entry) => {
      dispatch(selectEntry(e.id))
      props.history.push(`/${groupId}/${e.id}`)
    },
    [groupId]
  )

  const items = entries.map((e) => (
    <EntryItem
      key={e.id}
      data={e}
      active={!!entry && entry.id === e.id}
      onClick={onEntrySelect}
    />
  ))

  return (
    <Wrapper>
      <Header>
        <SearchInput solid prefix={<Icon type='Search' />} />
        <SearchButton solid onClick={onEntryAdd}>
          <Icon type='Plus' />
        </SearchButton>
      </Header>
      <Container>{items}</Container>
    </Wrapper>
  )
}

export default withRouter(EntryList)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(p) => p.theme.list.width};
  background: ${(p) => p.theme.list.background};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 14px;
  height: 56px;
  -webkit-app-region: drag;
`

const SearchInput = styled(Input)`
  flex: 1;
  -webkit-app-region: no-drag;
`

const SearchButton = styled(Button)`
  margin-left: 10px;
  -webkit-app-region: no-drag;
`

const Container = styled(ScrollArea)`
  flex: 1;
  min-height: 0;
`
