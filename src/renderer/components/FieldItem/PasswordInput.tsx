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
      prefix={<Icon type='Lock' />}
      suffix={
        <Icons>
          {!disabled && (
            <Popup
              position='bottom-end'
              content={<PasswordGenerator value={value} onChange={onGenerate} />}
            >
              <Icon type='Zap' />
            </Popup>
          )}
          <Icon type={visible ? 'Eye' : 'EyeOff'} onClick={onToggle} />
          <Icon type='Copy' onClick={onCopy} />
        </Icons>
      }
    />
  )
}

const StyledInput = styled(Input)<{ percent: number }>`
  position: relative;

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
    `}
`

const Icons = styled.div`
  display: flex;

  & > div,
  & > span {
    margin-left: 8px;
  }
`
