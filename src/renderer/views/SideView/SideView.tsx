import { RouteComponentProps } from 'react-router'
import { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import GroupItem from '../../components/GroupItem'
import GroupItemEditor from '../../components/GroupItemEditor'
import Logo from '../../components/Logo'
import createContextMenu from '../../libs/create-context-menu'
import ScrollArea, { Handles as ScrollAreaHandles } from '../../components/ScrollArea'
import { styled } from '../../styles'
import { Group } from '../../models/group'
import { RootState } from '../../store'
import { addGroup, removeGroup, updateGroup, useDispatch } from '../../store/actions'
import { IconType } from '../../models/base'
import { MenuOption } from '../../components/Menu/MenuItem'

enum MenuType {
  edit = 'edit',
  remove = 'remove'
}

interface GroupLike {
  id: string
  icon: IconType
  title: string
}

const ContextMenu = createContextMenu()

const contextMenu: MenuOption<MenuType>[] = [
  { icon: 'Edit2', title: 'Edit', data: MenuType.edit },
  { icon: 'Trash', title: 'Delete', data: MenuType.remove }
]

const mapState = (state: RootState) => ({
  groups: state.groups
})

export interface Props extends RouteComponentProps<{ groupId?: string }> {}

export default function SideView (props: Props) {
  const groupId = props.match.params.groupId
  const refContainer = useRef<ScrollAreaHandles>()

  const [editingGroup, setEditingGroup] = useState<Group>()
  const [addingGroup, setAddingGroup] = useState<GroupLike>(null)

  const { groups } = useSelector(mapState)
  const dispatch = useDispatch()

  const onMenuClick = useCallback((e: React.MouseEvent, t: MenuType, g: Group) => {
    if (t === MenuType.edit) {
      setEditingGroup(g)
    } else if (t === MenuType.remove) {
      dispatch(removeGroup(g.id))
    }
  }, [])

  const onGroupSelect = useCallback((e: React.MouseEvent, g: GroupLike) => {
    props.history.push(`/${g.id}`)
  }, [])

  const onGroupUpdate = useCallback(
    async (icon: IconType, title: string) => {
      const id = editingGroup && editingGroup.id
      if (!id || !title) return

      await dispatch(updateGroup(id, icon, title))
      setEditingGroup(null)
    },
    [editingGroup]
  )

  const onGroupStartAdd = useCallback(() => {
    setAddingGroup({ id: '', icon: 'Archive', title: '' })
    refContainer.current.scrollToEnd()
  }, [])

  const onGroupAdd = useCallback(async (icon: IconType, title: string) => {
    setAddingGroup(null)
    if (!title) return

    const g = await dispatch(addGroup(icon, title))
    props.history.push(`/${g.id}`)

    refContainer.current.scrollToEnd()
  }, [])

  return (
    <Wrapper>
      <Header>
        <StyledLogo size='small' />
        <Title>Passhub</Title>
      </Header>
      <Container ref={refContainer}>
        <ContextMenu.Wrapper options={contextMenu} onClick={onMenuClick}>
          {groups.map((g) =>
            editingGroup && editingGroup.id === g.id ? (
              <GroupItemEditor key={g.id} icon={g.icon} title={g.title} onConfirm={onGroupUpdate} />
            ) : (
              <ContextMenu.Trigger key={g.id} payload={g}>
                <GroupItem data={g} active={g.id === groupId} onClick={onGroupSelect} />
              </ContextMenu.Trigger>
            )
          )}
        </ContextMenu.Wrapper>
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
}

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
