import * as React from 'react'
import { observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router'

import GroupAddition from '../../components/GroupAddition'
import GroupItem from '../../components/GroupItem'
import Logo from '../../components/Logo'
import ScrollArea from '../../components/ScrollArea'
import { styled, ThemeConsumer } from '../../styles'
import { appStore } from '../../stores'
import { IconType } from '../../models/base'

export interface Props extends RouteComponentProps {}

export interface State {}

@observer
class Sidebar extends React.Component<Props, State> {
  private onGroupAdd = async (icon: IconType, title: string) => {
    title = title.trim()
    if (!title) throw new Error('Title is required')

    const group = await appStore.addGroup(icon, title)
    this.onGroupSelect(group.id)
  }

  private onGroupSelect = (id: string) => {
    appStore.selectGroup(id)
    this.props.history.push(`/${id}`)
  }

  public render () {
    const groups = appStore.groups.map((group) => (
      <GroupItem
        key={group.id}
        icon={group.icon}
        title={group.title}
        active={!!appStore.group && group.id === appStore.group.id}
        onClick={() => this.onGroupSelect(group.id)}
      />
    ))

    return (
      <ThemeConsumer>
        {(theme) => (
          <Wrapper>
            <Header>
              <Logo size='small' background={theme.sidebar.logoBackground} />
              <Title>Passhub</Title>
            </Header>
            <Container>
              {groups}
              <GroupAddition onConfirm={this.onGroupAdd} />
            </Container>
          </Wrapper>
        )}
      </ThemeConsumer>
    )
  }
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

const Title = styled.div`
  margin-left: 8px;
  color: ${(p) => p.theme.sidebar.titleColor};
`

const Container = styled(ScrollArea)`
  flex: 1;
  min-height: 0;
`
