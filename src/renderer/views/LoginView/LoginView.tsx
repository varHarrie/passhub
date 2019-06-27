import { RouteComponentProps } from 'react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import Icon from '../../components/Icon'
import Input from '../../components/Input'
import Logo from '../../components/Logo'
import Database from '../../Database'
import { styled } from '../../styles'
import { useMessage } from '../../components/MessageProvider'

export interface Props extends RouteComponentProps {}

export default observer(function LoginView (props: Props) {
  const { history } = props
  const message = useMessage()
  const refInput = useRef<HTMLInputElement>(null)

  const [password, setPassword] = useState('')
  const [inputVisible, setInputVisible] = useState(false)

  const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim())
  }, [])

  const onConfirm = useCallback(
    async (e: React.KeyboardEvent) => {
      if (e.keyCode !== 13) return

      try {
        await Database.connect('./store.passhub', password)
      } catch (error) {
        message('XCircle', 'Incorrect password!')
        return
      }

      history.push('/')
    },
    [password, history]
  )

  useEffect(() => {
    setInputVisible(true)

    if (refInput.current) {
      refInput.current.focus()
    }
  }, [])

  return (
    <Wrapper>
      <StyledLogo />
      <PasswordInput
        ref={refInput}
        size='large'
        visible={inputVisible}
        value={password}
        suffix={<Icon type='Lock' />}
        onChange={onPasswordChange}
        onKeyDown={onConfirm}
      />
    </Wrapper>
  )
})

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
