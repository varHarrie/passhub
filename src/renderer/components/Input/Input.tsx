import styled, { css } from 'styled-components'
import { forwardRef, useCallback } from 'react'

import style from '../../libs/style'
import { noop } from '../../libs/utils'

export type InputType = 'text' | 'password' | 'textarea'

export type InputSize = 'small' | 'medium' | 'large'

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
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: ${(p) => p.theme.size[p.size]};
  line-height: 1em;
  outline: none;
  border-radius: ${(p) => p.theme.input.borderRadius};
  border: ${(p) => p.theme.input.normal.border};
  transition: all 0.3s;

  ${(p) => style('color', p.theme.input.normal.color, ['', ':hover', 'focus-within'])}
  ${(p) => style('background', p.theme.input.normal.background, ['', ':hover', 'focus-within'])}
  ${(p) => style('border-color', p.theme.input.normal.borderColor, ['', ':hover', 'focus-within'])}

  ${(p) =>
    p.solid &&
    css`
      border: ${p.theme.input.solid.border};
      ${style('color', p.theme.input.solid.color, ['', ':hover', 'focus-within'])}
      ${style('background', p.theme.input.solid.background, ['', ':hover', 'focus-within'])}
      ${style('border-color', p.theme.input.solid.borderColor, ['', ':hover', 'focus-within'])}
    `}
`

const OriginalInput = styled.input`
  padding-left: 8px;
  padding-right: 8px;
  display: block;
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  background: none;
  outline: none;
`

const Prefix = styled.div`
  display: flex;
  align-items: center;
  padding-left: 8px;
  height: 100%;
`

const Suffix = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  height: 100%;
`
