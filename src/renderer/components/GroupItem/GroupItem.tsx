import { useCallback } from 'react'

import Icon from '../Icon'
import { noop } from '../../libs/utils'
import { styled } from '../../styles'
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
  height: ${(p) => p.theme.sidebar.itemHeight};
  background: ${(p) =>
    p.active ? p.theme.sidebar.itemActiveBackground : p.theme.sidebar.itemBackground};
  color: ${(p) =>
    p.active ? p.theme.sidebar.itemTitleActiveColor : p.theme.sidebar.itemTitleColor};
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;

  &:hover {
    background: ${(p) => p.theme.sidebar.itemHoverBackground};
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: '';
    width: ${(p) => (p.active ? p.theme.sidebar.itemMarkActiveWidth : 0)};
    height: ${(p) => p.theme.sidebar.itemMarkHeight};
    background: ${(p) => p.theme.sidebar.itemMarkBackground};
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
