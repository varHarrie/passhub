import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import OverlayProvider from '../OverlayProvider'
import ModalContext from './ModalContext'

export interface Props {
  children: React.ReactNode
}

export default observer(function ModalProvider (props: Props) {
  return <Wrapper context={ModalContext}>{props.children}</Wrapper>
})

const Wrapper = styled(OverlayProvider)``
