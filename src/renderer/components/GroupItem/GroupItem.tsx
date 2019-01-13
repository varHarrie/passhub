import * as React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { noop } from '../../libs/utils'
import { IconType } from '../../models/base'

export interface Props {
  icon: IconType
  title: string
  active?: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export interface State {}

export default class GroupItem extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    onClick: noop
  }

  public render () {
    const { icon, title, active, onClick } = this.props

    return (
      <Wrapper active={active} onClick={onClick}>
        <Icon type={icon} />
        <Title>{title}</Title>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div<{ active?: boolean }>`
  position: relative;
  display: flex;
  padding: 0 14px;
  align-items: center;
  width: 100%;
  height: ${(p) => p.theme.sidebar.itemHeight};
  background: ${(p) => p.theme.sidebar.itemBackground};
  color: ${(p) =>
    p.active
      ? p.theme.sidebar.itemTitleActiveColor
      : p.theme.sidebar.itemTitleColor};
  cursor: pointer;
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
