import * as React from 'react'

import Icon from '../Icon'
import { styled } from '../../styles'
import { IconType } from '../../models/base'
import { noop } from '../../libs/utils'

export interface Props<T = any> {
  className?: string
  icon: IconType
  title: string
  data: T
  onClick?: (e: React.MouseEvent, data: T) => void
}

export default function MenuItem<T> (props: Props<T>) {
  const { className, icon, title, data, onClick = noop } = props

  const onMenuClick = React.useCallback(
    (e: React.MouseEvent) => {
      onClick(e, data)
    },
    [data, onClick]
  )

  return (
    <Wrapper className={className} onClick={onMenuClick}>
      <StyledIcon type={icon} size='small' />
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
  transition: background 0.3s;

  &:hover {
    background: #f6f6f6;
  }

  &:active {
    background: #e0e0e0;
  }
`

const StyledIcon = styled(Icon)`
  color: #999;
`

const Title = styled.div`
  margin-left: 8px;
`
