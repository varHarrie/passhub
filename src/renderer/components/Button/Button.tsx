import * as React from 'react'

import { styled } from '../../styles'

export type ButtonSize = 'medium' | 'large'

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

export default React.forwardRef(Button)

const Wrapper = styled.button<{ solid?: boolean; size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  min-width: ${(p) => p.theme.button.sizes[p.size]};
  height: ${(p) => p.theme.button.sizes[p.size]};
  line-height: ${(p) => p.theme.button.sizes[p.size]};
  outline: none;
  color: ${(p) => p.theme.button.color};
  background: ${(p) => p.theme.button.background};
  border: ${(p) => p.theme.button.border};
  border-radius: ${(p) => p.theme.button.borderRadius};
  text-align: center;
  transition: all 0.3s;

  &:hover {
    color: ${(p) => p.theme.button.hoverColor};
    background: ${(p) => p.theme.button.hoverBackground};
    border: ${(p) => p.theme.button.hoverBorder};
  }

  &:active {
    color: ${(p) => p.theme.button.activeColor};
    background: ${(p) => p.theme.button.activeBackground};
    border: ${(p) => p.theme.button.activeBorder};
  }

  ${(p) =>
    p.solid &&
    `
      background: ${p.theme.button.solidBackground};
      border: ${p.theme.button.solidBorder};

      &:hover {
        color: ${p.theme.button.solidHoverColor};
        background: ${p.theme.button.solidHoverBackground};
        border: ${p.theme.button.solidHoverBorder};
      }

      &:active {
        color: ${p.theme.button.solidActiveColor};
        background: ${p.theme.button.solidActiveBackground};
        border: ${p.theme.button.solidActiveBorder};
      }
  `}
`
