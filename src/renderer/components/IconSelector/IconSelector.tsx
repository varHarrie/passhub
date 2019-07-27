import styled from 'styled-components'
import { useCallback } from 'react'

import Icon from '../Icon'
import Popup from '../Popup'
import ScrollArea from '../ScrollArea'
import { AVAILABLE_ICON_NAMES, IconName } from '../../models/icon'
import { noop } from '../../libs/utils'
import { Position } from '../Popup/Popup'

export interface Props {
  value: IconName
  disabled?: boolean
  position?: Position
  children?: React.ReactNode
  onChange?: (value: IconName) => void
}

export default function IconSelector (props: Props) {
  const { value, disabled, position, children, onChange = noop } = props

  const content = (
    <Wrapper>
      <Inner>
        {AVAILABLE_ICON_NAMES.map((icon) => (
          <IconItem key={icon} icon={icon} selected={icon === value} onClick={onChange} />
        ))}
      </Inner>
    </Wrapper>
  )

  return (
    <Popup disabled={disabled} position={position} content={content} narrow>
      {children}
    </Popup>
  )
}

interface IconItemProps {
  icon: IconName
  selected?: boolean
  onClick: (icon: IconName) => void
}

function IconItem (props: IconItemProps) {
  const { icon, selected, onClick } = props

  const onItemClick = useCallback(() => {
    onClick(icon)
  }, [icon as string, onClick])

  return (
    <Item selected={selected} onClick={onItemClick}>
      <Icon name={icon} />
    </Item>
  )
}

const Wrapper = styled(ScrollArea)`
  height: 100px;
  width: 150px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
`

const Inner = styled.div`
  padding: 8px;
`

const Item = styled.div<{ selected?: boolean }>`
  padding: 4px;
  display: inline-block;
  width: 20%;
  background: ${(p) => (p.selected ? '#e0e0e0 !important;' : 'transparent')};
  border-radius: 3px;
  transition: background 0.3s;

  &:hover {
    background: #f6f6f6;
  }
`
