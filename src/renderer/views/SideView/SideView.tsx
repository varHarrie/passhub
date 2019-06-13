import { RouteComponentProps } from 'react-router'
import { Fragment, useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import GroupItem from '../../components/GroupItem'
import GroupItemEditor from '../../components/GroupItemEditor'
import Logo from '../../components/Logo'
import SideBar, { Handles as SideBarHandles } from '../../components/SideBar'
import createContextMenu, { MenuOption } from '../../libs/create-context-menu'
import { styled } from '../../styles'
import { Group } from '../../models/group'
import { RootState } from '../../store'
import { addGroup, removeGroup, updateGroup, useDispatch } from '../../store/actions'
import { IconType } from '../../models/base'

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
  const refSideBar = useRef<SideBarHandles>()

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
    refSideBar.current.scrollToEnd()
  }, [])

  const onGroupAdd = useCallback(async (icon: IconType, title: string) => {
    setAddingGroup(null)
    if (!title) return

    const g = await dispatch(addGroup(icon, title))
    refSideBar.current.scrollToEnd()
    props.history.push(`/${g.id}`)
  }, [])

  return (
    <SideBar
      ref={refSideBar}
      header={
        <Fragment>
          <StyledLogo size='small' />
          <Title>Passhub</Title>
        </Fragment>
      }
    >
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
        <GroupItemEditor icon={addingGroup.icon} title={addingGroup.title} onConfirm={onGroupAdd} />
      ) : (
        <GroupItem data={{ id: '', icon: 'Plus', title: 'New' }} onClick={onGroupStartAdd} />
      )}
    </SideBar>
  )
}

const StyledLogo = styled(Logo)`
  background: ${(p) => p.theme.sidebar.logoBackground};
`

const Title = styled.div`
  margin-left: 8px;
  color: ${(p) => p.theme.sidebar.titleColor};
`
