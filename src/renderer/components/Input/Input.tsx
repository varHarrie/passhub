import { forwardRef, useCallback } from 'react'

import { styled } from '../../styles'
import { noop } from '../../libs/utils'

export type InputType = 'text' | 'password' | 'textarea'

export type InputSize = 'medium' | 'large'

export interface Props {
  className?: string
  value?: string
  placeholder?: string
  solid?: boolean
  disabled?: boolean
  type?: InputType
  size?: InputSize
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  onChange?: React.ChangeEventHandler
  onKeyDown?: React.KeyboardEventHandler
  onBlur?: React.FocusEventHandler
}

function Input (props: Props, ref: React.Ref<HTMLInputElement>) {
  const {
    className,
    solid,
    size = 'medium',
    prefix,
    suffix,
    onChange = noop,
    ...inputProps
  } = props

  const onPreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  return (
    <Wrapper className={className} size={size} solid={solid}>
      {prefix && <Prefix onMouseDown={onPreventDefault}>{prefix}</Prefix>}
      <OriginalInput ref={ref} onChange={onChange} {...inputProps} />
      {suffix && <Suffix onMouseDown={onPreventDefault}>{suffix}</Suffix>}
    </Wrapper>
  )
}

export default forwardRef(Input)

const Wrapper = styled.label<{ size: InputSize; solid?: boolean }>`
  padding: 0 8px;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: ${(p) => p.theme.input.sizes[p.size]};
  line-height: 1em;
  outline: none;
  color: ${(p) => p.theme.input.color};
  background: ${(p) => p.theme.input.background};
  border-radius: ${(p) => p.theme.input.borderRadius};
  border: ${(p) => p.theme.input.border};
  transition: all 0.3s;

  &:focus-within {
    color: ${(p) => p.theme.input.focusColor};
    border: ${(p) => p.theme.input.focusBorder};
    box-shadow: ${(p) => p.theme.input.focusShadow};
  }

  ${(p) =>
    p.solid &&
    `
      background: ${p.theme.input.solidBackground};
      border: ${p.theme.input.solidBorder};

      &:focus-within {
        background: ${p.theme.input.solidFocusBackground};
        border: ${p.theme.input.solidFocusBackground};
        box-shadow: none;
      }
    `}
`

const OriginalInput = styled.input`
  display: block;
  flex: 1;
  min-width: 0;
  border: none;
  background: none;
  outline: none;
`

const Prefix = styled.span`
  margin-right: 8px;
`

const Suffix = styled.span`
  margin-left: 8px;
`
