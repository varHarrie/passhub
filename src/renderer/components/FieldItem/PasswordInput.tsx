import * as password from '../../libs/password'
import useToggle from '../../hooks/useToggle'
import Icon from '../Icon'
import Input from '../Input'
import PasswordGenerator from '../PasswordGenerator'
import Popup from '../Popup'
import { css, styled } from '../../styles'

interface Props {
  value: string
  disabled?: boolean
  onChange: React.ChangeEventHandler
  onGenerate: (value: string) => void
  onCopy: React.MouseEventHandler
}

export default function PasswordInput (props: Props) {
  const { value, disabled, onChange, onGenerate, onCopy } = props

  const [visible, onToggle] = useToggle()
  const type = visible ? 'text' : 'password'

  const percent = password.test(value).percent

  return (
    <StyledInput
      percent={percent}
      type={type}
      value={value}
      disabled={disabled}
      onChange={onChange}
      prefix={<Icon name='lock-2-line' />}
      suffix={
        <Actions>
          {!disabled && (
            <Popup
              position='bottom-end'
              content={<PasswordGenerator value={value} onChange={onGenerate} />}
            >
              <Icon name='flashlight-line' />
            </Popup>
          )}
          <Icon name={visible ? 'eye-line' : 'eye-close-line'} onClick={onToggle} />
          <Icon name='file-copy-line' onClick={onCopy} />
        </Actions>
      }
    />
  )
}

const Actions = styled.div`
  display: flex;
  opacity: 0;
  transition: opacity 0.3s;

  & > div,
  & > span {
    margin-left: 8px;
  }
`

const StyledInput = styled(Input)<{ percent: number }>`
  position: relative;

  &:hover ${Actions} {
    opacity: 1;
  }

  &::after {
    position: absolute;
    display: block;
    bottom: 0;
    left: 0;
    height: 2px;
    width: ${(p) => (p.disabled ? 0 : p.percent)}%;
    background: #999;
    content: '';
    transition: width 0.3s;
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
