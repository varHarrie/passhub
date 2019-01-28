import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useMappedState } from 'redux-react-hook'

import GroupAddition from '../../components/GroupAddition'
import GroupItem from '../../components/GroupItem'
import Logo from '../../components/Logo'
import ScrollArea from '../../components/ScrollArea'
import { styled } from '../../styles'
import { IconType } from '../../models/base'
import { RootState } from '../../store'
import { addGroup, useDispatch } from '../../store/actions'

const mapState = (state: RootState) => ({
  groups: state.groups,
  group: state.group
})

export interface Props extends RouteComponentProps {}

function Sidebar (props: Props) {
  const { groups, group } = useMappedState(mapState)
  const dispatch = useDispatch()

  const onGroupAdd = React.useCallback(
    async (icon: IconType, title: string) => {
      if (!title) return
      const g = await dispatch(addGroup(icon, title))
      props.history.push(`/${g.id}`)
    },
    []
  )

  const onGroupSelect = React.useCallback((id: string) => {
    props.history.push(`/${id}`)
  }, [])

  const items = groups.map((g) => (
    <GroupItem
      key={g.id}
      icon={g.icon}
      title={g.title}
      active={!!group && group.id === g.id}
      onClick={() => onGroupSelect(g.id)}
    />
  ))

  return (
    <Wrapper>
      <Header>
        <StyledLogo size='small' />
        <Title>Passhub</Title>
      </Header>
      <Container>
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
  width: ${(p) => p.theme.sidebar.width};
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
