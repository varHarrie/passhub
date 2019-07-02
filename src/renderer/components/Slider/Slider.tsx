import { useMemo, useRef } from 'react'

import useDragging from '../../hooks/useDragging'
import { styled } from '../../styles'
import { clamp, noop } from '../../libs/utils'

export interface Props {
  value: number
  min?: number
  max?: number
  onChange?: (value: number) => void
}

export default function Slider (props: Props) {
  const { value, min = 0, max = 100, onChange = noop } = props

  const realMin = useMemo(() => Math.min(min, max), [min, max])
  const realMax = useMemo(() => Math.max(min, max), [min, max])
  const realValue = clamp(value, realMin, realMax)

  const percent = Math.floor((realValue / (realMax - realMin)) * 100)

  const refInner = useRef<HTMLDivElement>()
  const refHandle = useRef<HTMLDivElement>()

  const dragging = useDragging(refHandle, (e) => {
    const { left: wrapperLeft, width: wrapperWidth } = refInner.current.getBoundingClientRect()
    const handleLeft = e.clientX

    const newValue = Math.round(((handleLeft - wrapperLeft) / wrapperWidth) * realMax)
    onChange(clamp(newValue, realMin, realMax))
  })

  return (
    <Wrapper>
      <Inner ref={refInner} percent={percent}>
        <Handle ref={refHandle} percent={percent} dragging={dragging}>
          {realValue}
        </Handle>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 14px 0;
`

const Inner = styled.div<{ percent: number }>`
  position: relative;
  height: 4px;
  width: 100%;
  background: #e0e0e0;
  cursor: pointer;
  user-select: none;

  &::after {
    display: block;
    height: 100%;
    width: ${(p) => p.percent}%;
    background: #999;
    content: '';
  }
`

const Handle = styled.div<{ percent: number; dragging: boolean }>`
  position: absolute;
  top: 50%;
  left: ${(p) => p.percent}%;
  padding: 2px 4px;
  min-width: 32px;
  background: ${(p) => (p.dragging ? '#eee' : '#fff')};
  border-radius: 3px;
  border: 2px solid #999;
  font-size: 12px;
  text-align: center;
  transform: translate(-50%, -50%);
  transition: background 0.3s;
`
