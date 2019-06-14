import { Children, useEffect, useRef, useState } from 'react'

import useDragging from '../../hooks/useDragging'
import { styled } from '../../styles'
import { clamp } from '../../libs/utils'

export type SizeType = number | string

export interface Props {
  className?: string
  defaultSize?: SizeType
  size?: SizeType[]
  children: React.ReactNode
}

export default function SplitLayout (props: Props) {
  const { className, size = [], children } = props
  const defaultSize = props.defaultSize || size[0] || 0

  const refWrapper = useRef<HTMLDivElement>(null)
  const refDivider = useRef<HTMLDivElement>(null)

  const [pos, setPos] = useState(typeof defaultSize === 'number' ? defaultSize : 0)

  useEffect(() => {
    const $wrapper = refWrapper.current
    if (!$wrapper) return

    setPos(toPixel(defaultSize, $wrapper.clientWidth))
  }, [])

  const dragging = useDragging(refDivider, (e) => {
    const $wrapper = refWrapper.current
    if (!$wrapper) return

    const { left } = $wrapper.getBoundingClientRect()
    const { clientX } = isTouchEvent(e) ? e.touches[0] : e

    const nextPos = clamp(
      clientX - left,
      toPixel(size[0] || 0, $wrapper.clientWidth),
      toPixel(size[1] || '100%', $wrapper.clientWidth)
    )

    setPos(Math.floor(nextPos))
  })

  const [side, main] = Children.toArray(children)

  return (
    <Wrapper ref={refWrapper} className={className} dragging={dragging}>
      <SidePane style={{ width: pos + 'px' }}>{side}</SidePane>
      <Divider ref={refDivider} dragging={dragging} />
      <MainPane>{main}</MainPane>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ dragging: boolean }>`
  display: flex;
  height: 100%;
  cursor: ${(p) => (p.dragging ? 'col-resize' : 'inherit')};
`

const SidePane = styled.div`
  height: 100%;
`

const MainPane = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
`

const Divider = styled.div<{ dragging: boolean }>`
  position: relative;
  z-index: 1;
  margin: 0 -2px;
  width: 5px;
  height: 100%;
  background-color: ${(p) =>
    p.dragging ? p.theme.divider.hoverBackground : p.theme.divider.background};
  background-clip: padding-box;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  cursor: col-resize;
  user-select: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(p) => p.theme.divider.hoverBackground};
  }
`

function isTouchEvent (e: any): e is TouchEvent {
  return !!e.touches
}

function toPixel (size: SizeType, totalSize: number) {
  return typeof size === 'number'
    ? size
    : size.endsWith('%')
    ? (totalSize * parseInt(size, 10)) / 100
    : parseInt(size, 10)
}
