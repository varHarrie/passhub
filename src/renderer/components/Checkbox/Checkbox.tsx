import styled from 'styled-components'
import { useCallback } from 'react'

import style from '../../libs/style'
import { noop } from '../../libs/utils'

export type CheckboxSize = 'small' | 'medium' | 'large'

export interface Props {
  checked?: boolean
  size?: CheckboxSize
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
}

export default function Checkbox (props: Props) {
  const { checked = false, size = 'medium', children, onChange = noop } = props

  const onCheckedChange = useCallback(() => {
    onChange(!checked)
  }, [checked])

  return (
    <Wrapper size={size} onClick={onCheckedChange}>
      <Mark size={size} checked={checked} />
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ size: CheckboxSize }>`
  display: flex;
  align-items: center;
  height: ${(p) => p.theme.size[p.size]};
  cursor: pointer;
  user-select: none;
`

const Mark = styled.div<{ checked: boolean; size: CheckboxSize }>`
  position: relative;
  width: ${(p) => p.theme.checkbox.size[p.size]};
  height: ${(p) => p.theme.checkbox.size[p.size]};
  border-radius: ${(p) => p.theme.checkbox.borderRadius};
  transition: background 0.3s;

  ${(p) => style('background', p.theme.checkbox.background, ['', 'hover', p.checked])}

  &::after {
    position: absolute;
    top: 45%;
    left: 50%;
    width: 8px;
    height: 4px;
    border-left: 3px solid #fff;
    border-bottom: 3px solid #fff;
    content: '';
    opacity: ${(p) => (p.checked ? 1 : 0)};
    transform: translate(-50%, -50%) rotate(-45deg) scale(${(p) => (p.checked ? 1 : 0.8)});
    transition: opacity 0.2s, transform 0.2s;
  }
`

const Content = styled.div`
  margin-left: 8px;
  color: #999;
`
