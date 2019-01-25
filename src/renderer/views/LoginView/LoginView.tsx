import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import Icon from '../../components/Icon'
import Input from '../../components/Input'
import Logo from '../../components/Logo'
import Database from '../../Database'
import { styled, ThemeConsumer } from '../../styles'

export interface Props extends RouteComponentProps {}

export default function LoginView (props: Props) {
  const [password, setPassword] = React.useState<string>('')
  const [inputVisible, setInputVisible] = React.useState<boolean>(false)

  const onPasswordChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value.trim())
    },
    []
  )

  const onConfirm = React.useCallback(
    async (e: React.KeyboardEvent) => {
      if (e.keyCode !== 13) return

      await Database.connect('./data.json')
      props.history.push('/')
    },
    [password]
  )

  React.useEffect(() => {
    setInputVisible(true)
  }, [])

  return (
    <ThemeConsumer>
      {(theme) => (
        <Wrapper>
          <StyledLogo />
          <PasswordInput
            size='large'
            visible={inputVisible}
            value={password}
            suffix={<Icon type='Lock' />}
            onChange={onPasswordChange}
            onKeyDown={onConfirm}
          />
        </Wrapper>
      )}
    </ThemeConsumer>
  )
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

const StyledLogo = styled(Logo)`
  background: ${(p) => p.theme.login.logoBackground};
`

const PasswordInput = styled(Input).attrs({ type: 'password' })<{
  visible: boolean
}>`
  margin-top: ${(p) => (p.visible ? '24px' : '5px')};
  width: 320px;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  -webkit-app-region: no-drag;
`
