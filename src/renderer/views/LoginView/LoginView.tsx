import * as React from 'react'

import { styled, ThemeConsumer } from '../../styles'
import Logo from '../../components/Logo'
import Input from '../../components/Input'
import Icon from '../../components/Icon'

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
      <ThemeConsumer>
        {(theme) => (
          <Wrapper>
            <Logo background={theme.login.logoBackground} />
            <PasswordInput
              size='large'
              visible={inputVisible}
              suffix={<Icon type='Lock' />}
            />
          </Wrapper>
        )}
      </ThemeConsumer>
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
  -webkit-app-region: no-drag;
`