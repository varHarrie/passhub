import styled from 'styled-components'

import MenuItem from './MenuItem'

export interface Props {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export default function Menu (props: Props) {
  const { className, style, children } = props

  return (
    <Wrapper className={className} style={style}>
      {children}
    </Wrapper>
  )
}

Menu.Item = MenuItem

const Wrapper = styled.div`
  width: 120px;
  background: ${(p) => p.theme.menu.background};
  border: ${(p) => p.theme.menu.border};
  border-color: ${(p) => p.theme.menu.borderColor};
  box-shadow: ${(p) => p.theme.menu.boxShadow};
  opacity: 1;
  border-radius: 3px;
  user-select: none;
`
