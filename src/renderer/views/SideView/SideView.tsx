import styled, { css, keyframes } from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { useCallback, useMemo, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import ContextMenu from '../../components/ContextMenu'
import GroupItem from '../../components/GroupItem'
import GroupItemEditor from '../../components/GroupItemEditor'
import Icon from '../../components/Icon'
import Logo from '../../components/Logo'
import useLanguage from '../../hooks/useLanguage'
import useTranslate from '../../hooks/useTranslate'
import ScrollArea, { Handles as ScrollAreaHandles } from '../../components/ScrollArea'
import { Group } from '../../models/group'
import { useAppStore } from '../../store'
import { MenuOption } from '../../components/Menu'
import { useConfirm } from '../../components/ModalProvider'
import { IconName } from '../../models/icon'

import i18n from '../../libs/i18n'
enum MenuType {
  edit = 'edit',
  remove = 'remove'
}

interface GroupLike {
  id: string
  icon: IconName
  title: string
}

function getMenus (): MenuOption<MenuType>[] {
  return [
    { icon: 'pencil-line', title: i18n.t('side.menu.edit'), data: MenuType.edit },
    { icon: 'delete-bin-line', title: i18n.t('side.menu.remove'), data: MenuType.remove }
  ]
}

export interface Props extends RouteComponentProps<{ groupId?: string }> {}

export default observer(function SideView (props: Props) {
  const { match, history } = props
  const { groupId } = match.params

  const t = useTranslate()
  const language = useLanguage()
  const confirm = useConfirm()
  const store = useAppStore()
  const refContainer = useRef<ScrollAreaHandles>()

  const [editingGroup, setEditingGroup] = useState<Group>()
  const [addingGroup, setAddingGroup] = useState<GroupLike>(null)
  const menus = useMemo(getMenus, [language])

  const onMenuClick = useCallback((e: React.MouseEvent, type: MenuType, g: Group) => {
    if (type === MenuType.edit) {
      setEditingGroup(g)
    } else if (type === MenuType.remove) {
      confirm({
        title: t('confirm.title'),
        content: t('side.remove-confirm'),
        onConfirm: () => {
          store.removeGroup(g.id)
        }
      })
    }
  }, [])

  const onGroupSelect = useCallback(
    (e: React.MouseEvent, g: GroupLike) => {
      history.push(`/${g.id}`)
    },
    [history]
  )

  const onGroupUpdate = useCallback(
    async (icon: IconName, title: string) => {
      const id = editingGroup && editingGroup.id
      if (!id || !title) return

      await store.updateGroup(id, icon, title)
      setEditingGroup(null)
    },
    [editingGroup]
  )

  const onGroupStartAdd = useCallback(() => {
    setAddingGroup({ id: '', icon: 'folder-line', title: '' })
    refContainer.current.scrollToEnd()
  }, [])

  const onGroupAdd = useCallback(
    async (icon: IconName, title: string) => {
      setAddingGroup(null)
      if (!title) return

      const g = await store.addGroup(icon, title)
      history.push(`/${g.id}`)

      refContainer.current.scrollToEnd()
    },
    [history]
  )

  return (
    <Wrapper>
      <Header>
        <StyledLogo size='small' />
        <Title>Passhub</Title>
        <SaveTip name='save-line' visible={store.saving} />
      </Header>
      <Container ref={refContainer}>
        <ContextMenu options={menus} onClick={onMenuClick}>
          {store.groups.map((g) =>
            editingGroup && editingGroup.id === g.id ? (
              <GroupItemEditor key={g.id} icon={g.icon} title={g.title} onConfirm={onGroupUpdate} />
            ) : (
              <ContextMenu.Trigger key={g.id} payload={g}>
                <GroupItem data={g} active={g.id === groupId} onClick={onGroupSelect} />
              </ContextMenu.Trigger>
            )
          )}
        </ContextMenu>
        {addingGroup ? (
          <GroupItemEditor
            icon={addingGroup.icon}
            title={addingGroup.title}
            onConfirm={onGroupAdd}
          />
        ) : (
          <GroupItem
            data={{ id: '', icon: 'add-line', title: t('side.new') }}
            onClick={onGroupStartAdd}
          />
        )}
      </Container>
    </Wrapper>
  )
})

const blinking = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(p) => p.theme.sidebar.background};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 14px;
  height: 56px;
  font-size: 20px;
  -webkit-app-region: drag;
`

const StyledLogo = styled(Logo)`
  background: ${(p) => p.theme.logo.background}; // todo: remove
`

const Title = styled.div`
  margin-left: 8px;
  flex: 1;
  color: ${(p) => p.theme.sidebar.titleColor};
`

const SaveTip = styled(Icon)<{ visible: boolean }>`
  opacity: 0;
  transition: opacity 0.3s;

  ${(p) =>
    p.visible &&
    css`
      animation: ${blinking} 1s infinite;
    `}
`

const Container = styled(ScrollArea)`
  flex: 1;
  min-height: 0;
`
