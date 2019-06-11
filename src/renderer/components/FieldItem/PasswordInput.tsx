import { useCallback, useState } from 'react'

import Icon from '../Icon'
import Input from '../Input'
import { styled } from '../../styles'

interface Props {
  value: string
  onChange: React.ChangeEventHandler
  onCopy: React.MouseEventHandler
}

export default function PasswordInput (props: Props) {
  const { value, onChange, onCopy } = props

  const [visible, setVisible] = useState(false)

  const onToggleVisible = useCallback(() => {
    setVisible(!visible)
  }, [visible])

  const type = visible ? 'text' : 'password'

  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      prefix={<Icon type='Lock' />}
      suffix={
        <Icons>
          <Icon type={visible ? 'Eye' : 'EyeOff'} onClick={onToggleVisible} />
          <Icon type='Copy' onClick={onCopy} />
        </Icons>
      }
    />
  )
}

const Icons = styled.div`
  display: flex;

  & > div {
    margin-left: 8px;
  }
`
