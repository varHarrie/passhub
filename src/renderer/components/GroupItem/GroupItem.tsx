import styled from 'styled-components'
import { useCallback } from 'react'

import style from '../../libs/style'
import Icon from '../Icon'
import { noop } from '../../libs/utils'
import { IconName } from '../../models/icon'

export interface GroupLike {
  id: string
  icon: IconName
  title: string
}

export interface Props<T> {
  className?: string
  data: T
  active?: boolean
  onClick?: (e: React.MouseEvent, group: T) => void
  onContextMenu?: (e: React.MouseEvent, group: T) => void
}

export default function GroupItem<T extends GroupLike> (props: Props<T>) {
  const { className, data, active, onClick = noop, onContextMenu = noop } = props

  const onGroupClick = useCallback(
    (e: React.MouseEvent) => {
      onClick(e, data)
    },
    [data]
  )

  const onGroupContextMenu = useCallback(
    (e: React.MouseEvent) => {
      onContextMenu(e, data)
    },
    [data]
  )

  return (
    <Wrapper
      className={className}
      active={active}
      onClick={onGroupClick}
      onContextMenu={onGroupContextMenu}
    >
      <Icon name={data.icon} />
      <Title>{data.title}</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ active?: boolean }>`
  position: relative;
  display: flex;
  padding: 0 14px;
  align-items: center;
  width: 100%;
  height: ${(p) => p.theme.groupItem.height};
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;

  ${(p) => style('background', p.theme.groupItem.background, ['', 'hover', p.active])}
  ${(p) => style('color', p.theme.groupItem.color, ['', 'hover', p.active])}

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: '';
    width: ${(p) => (p.active ? p.theme.groupItem.markActiveWidth : 0)};
    height: ${(p) => p.theme.groupItem.markHeight};
    background: ${(p) => p.theme.groupItem.markBackground};
    transition: all 0.3s;
  }
`

const Title = styled.div`
  margin-left: 12px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`
