import Icon from '../Icon'
import Input from '../Input'
import { css, styled } from '../../styles'
import { IconName } from '../../models/icon'

interface Props {
  value: string
  disabled?: boolean
  onChange: React.ChangeEventHandler
  onCopy: React.MouseEventHandler
}

export default function TextInput (props: Props) {
  const { value, disabled, onChange, onCopy } = props

  const icon = deduceIcon(value)

  return (
    <StyledInput
      value={value}
      disabled={disabled}
      onChange={onChange}
      prefix={<Icon name={icon} />}
      suffix={
        <Actions>
          <Icon name='file-copy-line' onClick={onCopy} />
        </Actions>
      }
    />
  )
}

const Actions = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
`

const StyledInput = styled(Input)`
  &:hover ${Actions} {
    opacity: 1;
  }

  ${(p) =>
    p.disabled &&
    css`
      padding: 0;
      border-color: transparent;

      &:hover {
        background: #f6f6f6;
      }
    `}
`

const urlReg = /^https?:\/\/(www.)?/
const emailReg = /^\S+@\S+(\.\S+)+$/

function deduceIcon (value: string): IconName {
  if (urlReg.test(value)) return 'links-line'
  if (emailReg.test(value)) return 'mail-line'

  return 'text'
}
