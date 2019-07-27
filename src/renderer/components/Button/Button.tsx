import styled, { css } from 'styled-components'
import { forwardRef } from 'react'

import style from '../../libs/style'

export type ButtonSize = 'small' | 'medium' | 'large'

interface Props {
  className?: string
  solid?: boolean
  size?: ButtonSize
  children?: React.ReactNode
  onClick?: React.MouseEventHandler
}

function Button (props: Props, ref: React.Ref<HTMLButtonElement>) {
  const { size = 'medium', ...rest } = props

  return <Wrapper ref={ref} size={size} {...rest} />
}

export default forwardRef(Button)

const Wrapper = styled.button<{ solid?: boolean; size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  min-width: ${(p) => p.theme.size[p.size]};
  height: ${(p) => p.theme.size[p.size]};
  line-height: ${(p) => p.theme.size[p.size]};
  outline: none;
  border: ${(p) => p.theme.button.normal.border};
  border-radius: ${(p) => p.theme.button.borderRadius};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  ${(p) => style('color', p.theme.button.normal.color, ['', 'hover', 'active'])}
  ${(p) => style('background', p.theme.button.normal.background, ['', 'hover', 'active'])}
  ${(p) => style('border-color', p.theme.button.normal.borderColor, ['', 'hover', 'active'])}

  ${(p) =>
    p.solid &&
    css`
      border: ${p.theme.button.solid.border};
      ${style('color', p.theme.button.solid.color, ['', 'hover', 'active'])}
      ${style('background', p.theme.button.solid.background, ['', 'hover', 'active'])}
      ${style('border-color', p.theme.button.solid.borderColor, ['', 'hover', 'active'])}
  `}
`
