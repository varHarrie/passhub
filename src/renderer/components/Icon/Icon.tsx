import * as React from 'react'
import * as Feather from 'react-feather'

import { styled } from '../../styles'
import { IconType } from '../../models/base'

export type IconSize = 'small' | 'medium' | 'large'

export interface Props {
  className?: string
  type: IconType
  size?: IconSize
}

export default function Icon (props: Props) {
  const { className, type, size = 'small' } = props
  const Image = Feather[type]

  return (
    <Wrapper className={className} size={size}>
      <Image />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ size: IconSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.theme.icon.sizes[p.size]};
  height: ${(p) => p.theme.icon.sizes[p.size]};
  color: inherit;
`
