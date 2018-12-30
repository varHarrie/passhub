import * as React from 'react'
import { styled } from '../../styles'

export type InputType = 'text' | 'password' | 'textarea'

export type InputSize = 'medium' | 'large'

export interface Props {
  className?: string
  value?: string
  placeholder?: string
  type: InputType
  size: InputSize
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  onChange?: React.ChangeEventHandler
}

export interface State {}

export default class Input extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    type: 'text',
    size: 'large'
  }

  public render () {
    const {
      className,
      value,
      placeholder,
      type,
      size,
      prefix,
      suffix,
      onChange
    } = this.props

    return (
      <Wrapper className={className} size={size}>
        {prefix}
        <OriginalInput
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
        {suffix}
      </Wrapper>
    )
  }
}

const sizes: { [key in InputSize]: number } = {
  medium: 32,
  large: 36
}

const Wrapper = styled.label<{ size: InputSize }>`
  padding: ${(p) => p.theme.input.padding[p.size]};
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(p) => p.theme.input.sizes[p.size]};
  outline: none;
  color: ${(p) => p.theme.input.color};
  background: ${(p) => p.theme.input.background};
  border-radius: ${(p) => p.theme.input.borderRadius};
  border: ${(p) => p.theme.input.border};
  transition: background 0.3s;

  &:focus {
    background: #c9c9c9;
  }
`

const OriginalInput = styled.input`
  display: block;
  flex: 1;
  border: none;
  background: none;
  outline: none;
`
