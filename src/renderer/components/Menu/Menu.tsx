import MenuItem from './MenuItem'
import { styled } from '../../styles'

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
  background: ${(p) => p.theme.window.background};
  border: ${(p) => p.theme.window.border};
  /* box-shadow: ${(p) => p.theme.window.shadow}; */
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 3px;
  user-select: none;
`
