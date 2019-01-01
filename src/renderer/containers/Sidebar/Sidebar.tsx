import * as React from 'react'
import styled from 'styled-components'
import Logo from '../../components/Logo'
import { ThemeConsumer } from '../../styles'
import Icon from '../../components/Icon'

export interface Props {}

export interface State {}

export default class Sidebar extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {}

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <ThemeConsumer>
        {(theme) => (
          <Wrapper>
            <Header>
              <Logo size='small' background={theme.sidebar.logoBackground} />
              <Title>Passhub</Title>
            </Header>
            <Container>
              <GroupItem>
                <GroupIcon type='Folder' />
                <GroupTitle>All</GroupTitle>
              </GroupItem>
              <GroupItem active>
                <GroupIcon type='Folder' />
                <GroupTitle>Emails</GroupTitle>
              </GroupItem>
              <GroupItem>
                <GroupIcon type='Folder' />
                <GroupTitle>Accounts</GroupTitle>
              </GroupItem>
              <GroupItem>
                <GroupIcon type='Folder' />
                <GroupTitle>Games</GroupTitle>
              </GroupItem>
            </Container>
          </Wrapper>
        )}
      </ThemeConsumer>
    )
  }
}

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

const Container = styled.div``

const GroupItem = styled.div<{ active?: boolean }>`
  position: relative;
  display: flex;
  padding: 0 14px;
  align-items: center;
  height: ${(p) => p.theme.sidebar.itemHeight};
  background: ${(p) => p.theme.sidebar.itemBackground};
  color: ${(p) =>
    p.active
      ? p.theme.sidebar.itemTitleActiveColor
      : p.theme.sidebar.itemTitleColor};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${(p) => p.theme.sidebar.itemHoverBackground};
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: '';
    width: ${(p) => (p.active ? p.theme.sidebar.itemMarkActiveWidth : 0)};
    height: ${(p) => p.theme.sidebar.itemMarkHeight};
    background: ${(p) => p.theme.sidebar.itemMarkBackground};
    transition: all 0.3s;
  }
`

const GroupIcon = styled(Icon)``

const GroupTitle = styled.div`
  margin-left: 12px;
`
