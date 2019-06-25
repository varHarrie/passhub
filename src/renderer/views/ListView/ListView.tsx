import { useCallback, useMemo, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react-lite'

import Button from '../../components/Button'
import ContextMenu from '../../components/ContextMenu'
import EntryItem from '../../components/EntryItem'
import Icon from '../../components/Icon'
import Input from '../../components/Input'
import Modal from '../../components/Modal'
import ScrollArea, { Handles as ScrollAreaHandles } from '../../components/ScrollArea'
import { styled } from '../../styles'
import { Entry } from '../../models/entry'
import { useAppStore } from '../../store'
import { MenuOption } from '../../components/Menu'

enum MenuType {
  edit = 'edit',
  remove = 'remove'
}

const contextMenu: MenuOption<MenuType>[] = [
  { icon: 'Edit2', title: 'Edit', data: MenuType.edit },
  { icon: 'Trash', title: 'Delete', data: MenuType.remove }
]

export interface Props extends RouteComponentProps<{ groupId: string; entryId?: string }> {}

export default observer(function ListView (props: Props) {
  const { match, history } = props
  const { groupId, entryId } = match.params

  const store = useAppStore()
  const refContainer = useRef<ScrollAreaHandles>()

  const [keyword, setKeyword] = useState('')

  const filteredEntries = useMemo(() => {
    return store.entries.filter(entryFilter(keyword))
  }, [store.entries, keyword])

  const onMenuClick = useCallback(
    (_: React.MouseEvent, t: MenuType, e: Entry) => {
      if (t === MenuType.edit) {
        history.push(`/${groupId}/${e.id}/editable`)
      } else if (t === MenuType.remove) {
        Modal.confirm({
          title: 'Confirm',
          content: 'Are you sure you want to delete this entry?',
          onConfirm: () => {
            store.removeEntry(e.id)
          }
        })
      }
    },
    [groupId, history]
  )

  const onKeywordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  const onEntryAdd = useCallback(async () => {
    const e = await store.addEntry()
    history.push(`/${groupId}/${e.id}/editable`)

    refContainer.current.scrollToEnd()
  }, [groupId, history])

  const onEntrySelect = useCallback(
    (e: Entry) => {
      history.push(`/${groupId}/${e.id}`)
    },
    [groupId, history]
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
        <ContextMenu options={contextMenu} onClick={onMenuClick}>
          {filteredEntries.map((e) => (
            <ContextMenu.Trigger key={e.id} payload={e}>
              <EntryItem data={e} active={e.id === entryId} onClick={onEntrySelect} />
            </ContextMenu.Trigger>
          ))}
        </ContextMenu>
      </Container>
    </Wrapper>
  )
})

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

function entryFilter (keyword: string) {
  return (entry: Entry) =>
    entry.title.indexOf(keyword) > -1 || entry.description.indexOf(keyword) > -1
}
