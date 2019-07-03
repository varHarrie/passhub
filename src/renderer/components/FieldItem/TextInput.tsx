import Icon from '../Icon'
import Input from '../Input'
import { css, styled } from '../../styles'

interface Props {
  value: string
  disabled?: boolean
  onChange: React.ChangeEventHandler
  onCopy: React.MouseEventHandler
}

export default function TextInput (props: Props) {
  const { value, disabled, onChange, onCopy } = props

  // todo:
  const icon = 'text'

  return (
    <StyledInput
      value={value}
      disabled={disabled}
      onChange={onChange}
      prefix={<Icon name={icon} />}
      suffix={<Icon name='file-copy' onClick={onCopy} />}
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
