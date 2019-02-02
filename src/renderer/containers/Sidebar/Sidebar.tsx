import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useMappedState } from 'redux-react-hook'

import GroupAddition from '../../components/GroupAddition'
import GroupItem from '../../components/GroupItem'
import Logo from '../../components/Logo'
import Menu from '../../components/Menu'
import ScrollArea from '../../components/ScrollArea'
import useContextMenu from '../../hooks/useContextMenu'
import { styled } from '../../styles'
import { IconType } from '../../models/base'
import { RootState } from '../../store'
import { addGroup, removeGroup, useDispatch } from '../../store/actions'
import { Group } from '../../models/group'

enum MenuType {
  edit = 'edit',
  remove = 'remove'
}

const mapState = (state: RootState) => ({
  groups: state.groups,
  group: state.group
})

const contextMenu: any[] = [
  { icon: 'Edit2', title: 'Edit', data: 'edit' },
  { icon: 'Trash', title: 'Delete', data: 'remove' }
]

export interface Props extends RouteComponentProps {}

function Sidebar (props: Props) {
  const { groups, group } = useMappedState(mapState)
  const dispatch = useDispatch()

  const onMenuItemClick = React.useCallback((type: MenuType, g: Group) => {
    if (type === MenuType.remove) {
      dispatch(removeGroup(g.id))
    }
  }, [])

  const { menu, open } = useContextMenu(contextMenu, onMenuItemClick)

  const onGroupAdd = React.useCallback(
    async (icon: IconType, title: string) => {
      if (!title) return
      const g = await dispatch(addGroup(icon, title))
      props.history.push(`/${g.id}`)
    },
    []
  )

  const onGroupSelect = React.useCallback((e, g: { id: string }) => {
    props.history.push(`/${g.id}`)
  }, [])

  const items = groups.map((g) => (
    <GroupItem
      key={g.id}
      data={g}
      active={!!group && group.id === g.id}
      onClick={onGroupSelect}
      onContextMenu={open}
    />
  ))

  return (
    <Wrapper>
      <Header>
        <StyledLogo size='small' />
        <Title>Passhub</Title>
      </Header>
      <Container>
        {menu}
        {items}
        <GroupAddition onConfirm={onGroupAdd} />
      </Container>
    </Wrapper>
  )
}

export default withRouter(Sidebar)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(p) => p.theme.sidebar.background};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 14px;
  height: 56px;
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
