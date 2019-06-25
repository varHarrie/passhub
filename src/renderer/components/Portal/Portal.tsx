import { createPortal } from 'react-dom'

export interface Props {
  target?: Element
  children?: React.ReactNode
}

export default function Portal (props: Props) {
  const { target = document.body, children } = props
  return createPortal(children, target)
}
