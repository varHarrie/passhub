import * as React from 'react'
import { keyframes } from 'styled-components'
import { RouteComponentProps } from 'react-router'

import Icon from '../../components/Icon'
import Input from '../../components/Input'
import Logo from '../../components/Logo'
import { styled, ThemeConsumer } from '../../styles'
import { appStore } from '../../stores'

export interface Props extends RouteComponentProps {}

export interface State {
  password: string
  inputVisible: boolean
}

export default class LoginView extends React.Component<Props, State> {
  public state: State = {
    password: '',
    inputVisible: false
  }

  public componentDidMount () {
    setTimeout(() => {
      this.setState({ inputVisible: true })
    }, 100)
  }

  private onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value })
  }

  private onConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== 13) return

    const password = this.state.password.trim()
    console.log(password)
    appStore.initialize()
    this.props.history.push('/')
  }

  public render () {
    const { password, inputVisible } = this.state

    return (
      <ThemeConsumer>
        {(theme) => (
          <Wrapper>
            <Logo background={theme.login.logoBackground} />
            <PasswordInput
              size='large'
              visible={inputVisible}
              value={password}
              suffix={<Icon type='Lock' />}
              onChange={this.onPasswordChange}
              onKeyDown={this.onConfirm}
            />
          </Wrapper>
        )}
      </ThemeConsumer>
    )
  }
}

const inputAnimation = keyframes`
  0% { margin-top: 5px; opacity: 0; }
  25% { margin-top: 5px; opacity: 0; }
  100% { margin-top: 24px; opacity: 1; }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
`

const PasswordInput = styled(Input).attrs({ type: 'password' })<{
  visible: boolean
}>`
  margin-top: ${(p) => (p.visible ? '24px' : '5px')};
  width: 320px;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  -webkit-app-region: no-drag;
`
