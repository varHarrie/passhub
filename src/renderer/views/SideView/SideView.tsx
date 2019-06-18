import { RouteComponentProps } from 'react-router'
import { useCallback, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import ContextMenu from '../../components/ContextMenu'
import GroupItem from '../../components/GroupItem'
import GroupItemEditor from '../../components/GroupItemEditor'
import Logo from '../../components/Logo'
import ScrollArea, { Handles as ScrollAreaHandles } from '../../components/ScrollArea'
import { styled } from '../../styles'
import { Group } from '../../models/group'
import { IconType } from '../../models/base'
import { MenuOption } from '../../components/Menu/MenuItem'
import { useAppStore } from '../../store'

enum MenuType {
  edit = 'edit',
  remove = 'remove'
}

interface GroupLike {
  id: string
  icon: IconType
  title: string
}

const contextMenu: MenuOption<MenuType>[] = [
  { icon: 'Edit2', title: 'Edit', data: MenuType.edit },
  { icon: 'Trash', title: 'Delete', data: MenuType.remove }
]

export interface Props extends RouteComponentProps<{ groupId?: string }> {}

export default observer(function SideView (props: Props) {
  const { match, history } = props
  const { groupId } = match.params

  const store = useAppStore()
  const refContainer = useRef<ScrollAreaHandles>()

  const [editingGroup, setEditingGroup] = useState<Group>()
  const [addingGroup, setAddingGroup] = useState<GroupLike>(null)

  const onMenuClick = useCallback((e: React.MouseEvent, t: MenuType, g: Group) => {
    if (t === MenuType.edit) {
      setEditingGroup(g)
    } else if (t === MenuType.remove) {
      store.removeGroup(g.id)
    }
  }, [])

  const onGroupSelect = useCallback(
    (e: React.MouseEvent, g: GroupLike) => {
      history.push(`/${g.id}`)
    },
    [history]
  )

  const onGroupUpdate = useCallback(
    async (icon: IconType, title: string) => {
      const id = editingGroup && editingGroup.id
      if (!id || !title) return

      await store.updateGroup(id, icon, title)
      setEditingGroup(null)
    },
    [editingGroup]
  )

  const onGroupStartAdd = useCallback(() => {
    setAddingGroup({ id: '', icon: 'Archive', title: '' })
    refContainer.current.scrollToEnd()
  }, [])

  const onGroupAdd = useCallback(
    async (icon: IconType, title: string) => {
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
      </Header>
      <Container ref={refContainer}>
        <ContextMenu options={contextMenu} onClick={onMenuClick}>
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
          <GroupItem data={{ id: '', icon: 'Plus', title: 'New' }} onClick={onGroupStartAdd} />
        )}
      </Container>
    </Wrapper>
  )
})

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
  background: ${(p) => p.theme.sidebar.logoBackground};
`

const Title = styled.div`
  margin-left: 8px;
  color: ${(p) => p.theme.sidebar.titleColor};
`

const Container = styled(ScrollArea)`
  flex: 1;
  min-height: 0;
`
