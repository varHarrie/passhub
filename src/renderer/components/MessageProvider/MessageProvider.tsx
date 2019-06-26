import { observer } from 'mobx-react-lite'

import OverlayProvider from '../OverlayProvider'
import MessageContext from './MessageContext'
import { styled } from '../../styles'

export interface Props {
  children: React.ReactNode
}

export default observer(function MessageProvider (props: Props) {
  return <Wrapper context={MessageContext}>{props.children}</Wrapper>
})

const Wrapper = styled(OverlayProvider)`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  pointer-events: none;
`
