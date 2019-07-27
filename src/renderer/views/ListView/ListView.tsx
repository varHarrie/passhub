import styled from 'styled-components'
import { useCallback, useMemo, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react-lite'

import Button from '../../components/Button'
import ContextMenu from '../../components/ContextMenu'
import EntryItem from '../../components/EntryItem'
import Icon from '../../components/Icon'
import Input from '../../components/Input'
import useLanguage from '../../hooks/useLanguage'
import useTranslate from '../../hooks/useTranslate'
import ScrollArea, { Handles as ScrollAreaHandles } from '../../components/ScrollArea'
import { Entry } from '../../models/entry'
import { useAppStore } from '../../store'
import { MenuOption } from '../../components/Menu'
import { useConfirm } from '../../components/ModalProvider'

import i18n from '../../libs/i18n'

enum MenuType {
  edit = 'edit',
  remove = 'remove'
}

function getMenus (): MenuOption<MenuType>[] {
  return [
    { icon: 'pencil-line', title: i18n.t('list.menu.edit'), data: MenuType.edit },
    { icon: 'delete-bin-line', title: i18n.t('list.menu.remove'), data: MenuType.remove }
  ]
}

export interface Props extends RouteComponentProps<{ groupId: string; entryId?: string }> {}

export default observer(function ListView (props: Props) {
  const { match, history } = props
  const { groupId, entryId } = match.params

  const t = useTranslate()
  const language = useLanguage()
  const confirm = useConfirm()
  const store = useAppStore()
  const refContainer = useRef<ScrollAreaHandles>()

  const [keyword, setKeyword] = useState('')
  const menus = useMemo(getMenus, [language])

  const filteredEntries = useMemo(() => {
    return store.entries.filter(entryFilter(keyword))
  }, [store.entries, keyword])

  const onMenuClick = useCallback(
    (_: React.MouseEvent, type: MenuType, e: Entry) => {
      if (type === MenuType.edit && e.id !== entryId) {
        history.push(`/${groupId}/${e.id}/editable`)
      } else if (type === MenuType.remove) {
        confirm({
          title: t('confirm.title'),
          content: t('list.remove-confirm'),
          onConfirm: () => {
            store.removeEntry(e.id)
          }
        })
      }
    },
    [groupId, entryId, history]
  )

  const onKeywordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  const onKeywordClear = useCallback(() => setKeyword(''), [])

  const onEntryAdd = useCallback(async () => {
    const e = await store.addEntry()
    history.push(`/${groupId}/${e.id}/editable`)

    refContainer.current.scrollToEnd()
  }, [groupId, history])

  const onEntrySelect = useCallback(
    (e: Entry) => {
      if (e.id !== entryId) {
        history.push(`/${groupId}/${e.id}`)
      }
    },
    [groupId, entryId, history]
  )

  return (
    <Wrapper>
      <Header>
        <SearchInput
          solid
          prefix={<Icon name='search-line' />}
          suffix={!!keyword.length && <Icon name='close-line' onClick={onKeywordClear} />}
          value={keyword}
          onChange={onKeywordChange}
        />
        <AddButton solid onClick={onEntryAdd}>
          <Icon name='add-line' />
        </AddButton>
      </Header>
      <Container ref={refContainer}>
        <ContextMenu options={menus} onClick={onMenuClick}>
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
