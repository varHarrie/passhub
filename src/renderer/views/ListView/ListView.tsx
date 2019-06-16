import { useCallback, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import Button from '../../components/Button'
import EntryItem from '../../components/EntryItem'
import Icon from '../../components/Icon'
import Input from '../../components/Input'
import createContextMenu from '../../libs/create-context-menu'
import ScrollArea, { Handles as ScrollAreaHandles } from '../../components/ScrollArea'
import { styled } from '../../styles'
import { addEntry, removeEntry, useDispatch } from '../../store/actions'
import { RootState } from '../../store'
import { Entry } from '../../models/entry'
import { MenuOption } from '../../components/Menu/MenuItem'

enum MenuType {
  edit = 'edit',
  remove = 'remove'
}

const ContextMenu = createContextMenu()

const contextMenu: MenuOption<MenuType>[] = [
  { icon: 'Edit2', title: 'Edit', data: MenuType.edit },
  { icon: 'Trash', title: 'Delete', data: MenuType.remove }
]

const mapState = (state: RootState) => ({
  entries: state.entries
})

export interface Props extends RouteComponentProps<{ groupId: string; entryId?: string }> {}

export default function ListView (props: Props) {
  const { groupId, entryId } = props.match.params
  const refContainer = useRef<ScrollAreaHandles>()

  const [keyword, setKeyword] = useState('')
  const { entries } = useSelector(mapState)

  const filteredEntries = useMemo(
    () =>
      entries.filter((e) => e.title.indexOf(keyword) > -1 || e.description.indexOf(keyword) > -1),
    [entries, keyword]
  )

  const dispatch = useDispatch()

  const onMenuClick = useCallback((_: React.MouseEvent, t: MenuType, e: Entry) => {
    if (t === MenuType.edit) {
      props.history.push(`/${groupId}/${e.id}/editable`)
    } else if (t === MenuType.remove) {
      dispatch(removeEntry(e.id))
    }
  }, [])

  const onKeywordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  const onEntryAdd = useCallback(async () => {
    const e = await dispatch(addEntry())
    props.history.push(`/${groupId}/${e.id}/editable`)

    refContainer.current.scrollToEnd()
  }, [groupId])

  const onEntrySelect = useCallback(
    (e: Entry) => {
      props.history.push(`/${groupId}/${e.id}`)
    },
    [groupId]
  )

  return (
    <Wrapper>
      <Header>
        <SearchInput
          solid
          prefix={<Icon type='Search' />}
          value={keyword}
          onChange={onKeywordChange}
        />
        <AddButton solid onClick={onEntryAdd}>
          <Icon type='Plus' />
        </AddButton>
      </Header>
      <Container ref={refContainer}>
        <ContextMenu.Wrapper options={contextMenu} onClick={onMenuClick}>
          {filteredEntries.map((e) => (
            <ContextMenu.Trigger key={e.id} payload={e}>
              <EntryItem data={e} active={e.id === entryId} onClick={onEntrySelect} />
            </ContextMenu.Trigger>
          ))}
        </ContextMenu.Wrapper>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

const AddButton = styled(Button)`
  margin-left: 10px;
  -webkit-app-region: no-drag;
`

const Container = styled(ScrollArea)`
  flex: 1;
  min-height: 0;
`
