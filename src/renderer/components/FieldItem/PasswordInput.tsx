import useToggle from '../../hooks/useToggle'
import Icon from '../Icon'
import Input from '../Input'
import { css, styled } from '../../styles'

interface Props {
  value: string
  disabled?: boolean
  onChange: React.ChangeEventHandler
  onCopy: React.MouseEventHandler
}

export default function PasswordInput (props: Props) {
  const { value, disabled, onChange, onCopy } = props

  const [visible, onToggle] = useToggle()

  const type = visible ? 'text' : 'password'

  return (
    <StyledInput
      type={type}
      value={value}
      disabled={disabled}
      onChange={onChange}
      prefix={<Icon type='Lock' />}
      suffix={
        <Icons>
          <Icon type={visible ? 'Eye' : 'EyeOff'} onClick={onToggle} />
          <Icon type='Copy' onClick={onCopy} />
        </Icons>
      }
    />
  )
}

const StyledInput = styled(Input)`
  ${(p) =>
    p.disabled &&
    css`
      padding: 0;
      border-color: transparent;
    `}
`

const Icons = styled.div`
  display: flex;

  & > div {
    margin-left: 8px;
  }
`
