import 'remixicon/fonts/remixicon.css'

import { css, keyframes, styled } from '../../styles'
import { IconName } from '../../models/icon'

export type IconSize = 'xxs' | 'xs' | 'sm' | '1x' | 'lg' | 'xl' | '2x' | '3x'

export type IconType = 'line' | 'fill'

export interface Props {
  className?: string
  name: IconName
  type?: IconType
  size?: IconSize
  onClick?: React.MouseEventHandler
}

export default function Icon (props: Props) {
  const { className, name, type = 'line', size = '1x', onClick } = props

  const iconClass = `remixicon-${name}-${type} ri-${size}`

  return (
    <Wrapper className={className} onClick={onClick}>
      <Inner className={iconClass} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: bottom;
  color: inherit;
  font-size: 1.2em;
  cursor: ${(p) => (p.onClick ? 'pointer' : 'inherit')};
  user-select: none;
`

const Inner = styled.i``
