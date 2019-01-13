import * as React from 'react'
import * as Feather from 'react-feather'

import { styled } from '../../styles'
import { IconType } from '../../models/base'

export type IconSize = 'small' | 'medium' | 'large'

export interface Props {
  type: IconType
  size: IconSize
}

export interface State {}

export default class Icon extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    size: 'small'
  }

  public render () {
    const { type, size } = this.props

    const Image = Feather[type]

    return (
      <Wrapper size={size}>
        <Image />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div<{ size: IconSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.theme.icon.sizes[p.size]};
  height: ${(p) => p.theme.icon.sizes[p.size]};
  color: inherit;
`
