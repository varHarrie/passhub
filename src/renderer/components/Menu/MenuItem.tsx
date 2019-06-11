import { useCallback } from 'react'

import Icon from '../Icon'
import { styled } from '../../styles'
import { IconType } from '../../models/base'
import { noop } from '../../libs/utils'

export interface Props<T = any> {
  className?: string
  icon: IconType
  title: string
  data?: T
  onClick?: (e: React.MouseEvent, data: T) => void
}

export default function MenuItem<T> (props: Props<T>) {
  const { className, icon, title, data, onClick = noop } = props

  const onMenuClick = useCallback(
    (e: React.MouseEvent) => {
      onClick(e, data)
    },
    [data, onClick]
  )

  return (
    <Wrapper className={className} onClick={onMenuClick}>
      <Icon type={icon} size='small' />
      <Title>{title}</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  height: 32px;
  cursor: pointer;
  color: #999;
  transition: background 0.3s;

  &:hover {
    background: #f6f6f6;
  }

  &:active {
    background: #e0e0e0;
  }
`

const Title = styled.div`
  margin-left: 8px;
`
