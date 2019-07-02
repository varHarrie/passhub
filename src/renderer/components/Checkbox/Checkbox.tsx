import { useCallback } from 'react'

import { styled } from '../../styles'
import { noop } from '../../libs/utils'

export interface Props {
  checked?: boolean
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
}

export default function Checkbox (props: Props) {
  const { checked = false, children, onChange = noop } = props

  const onCheckedChange = useCallback(() => {
    onChange(!checked)
  }, [checked])

  return (
    <Wrapper onClick={onCheckedChange}>
      <Mark checked={checked} />
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  cursor: pointer;
  user-select: none;
`

const Mark = styled.div<{ checked: boolean }>`
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  background: ${(p) => (p.checked ? '#999' : '#E0E0E0')};
  transition: background 0.3s;

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
