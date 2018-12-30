import * as React from 'react'

import { styled } from '../../styles'
import Logo from '../../components/Logo'
import Input from '../../components/Input'

export interface Props {}

export interface State {
  inputVisible: boolean
}

export default class LoginView extends React.Component<Props, State> {
  public state: State = {
    inputVisible: false
  }

  public componentDidMount () {
    setTimeout(() => {
      this.setState({ inputVisible: true })
    }, 100)
  }

  public render () {
    const { inputVisible } = this.state

    return (
      <Wrapper>
        <Logo />
        <PasswordInput size='large' visible={inputVisible} />
      </Wrapper>
    )
  }
}

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
  transition: opacity 0.3s, margin-top 0.3s;
  -webkit-app-region: no-drag;
`
