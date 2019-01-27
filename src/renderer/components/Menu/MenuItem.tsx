import * as React from 'react'
import { styled } from '../../styles'
import { IconType } from '../../models/base'
import Icon from '../Icon'

export interface Props<T> {
  className?: string
  icon: IconType
  title: string
  onClick: React.MouseEventHandler
}

export default function MenuItem<T> (props: Props<T>) {
  const { className, icon, title, onClick } = props

  return (
    <Wrapper className={className} onClick={onClick}>
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
