import * as React from 'react'
import * as Feather from 'react-feather'

import { css, keyframes, styled } from '../../styles'
import { IconType } from '../../models/base'

export type IconSize = 'small' | 'medium' | 'large'

export interface Props {
  className?: string
  type: IconType
  size?: IconSize
  rotating?: boolean
  onClick?: React.MouseEventHandler
}

export default function Icon (props: Props) {
  const { className, type, rotating, size = 'small', onClick } = props
  const Image = Feather[type]

  return (
    <Wrapper
      className={className}
      size={size}
      rotating={rotating}
      onClick={onClick}
    >
      <Image />
    </Wrapper>
  )
}

const rotate = keyframes`
  0% { transform: rotate(0); }
  100% {transform: rotate(360deg); }
`

const Wrapper = styled.div<{ size: IconSize; rotating?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.theme.icon.sizes[p.size]};
  height: ${(p) => p.theme.icon.sizes[p.size]};
  vertical-align: bottom;
  color: inherit;
  user-select: none;

  ${(p) =>
    p.rotating &&
    css`
      animation: 1s ${rotate} infinite linear;
    `}
`
