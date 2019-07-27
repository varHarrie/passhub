import styled from 'styled-components'
import { ipcRenderer } from 'electron'

import style from '../../libs/style'
import Icon from '../Icon'

function onMinimize () {
  ipcRenderer.send('minimize')
}

function onClose () {
  ipcRenderer.send('close')
}

export interface Props {
  className?: string
}

export default function WindowActions (props: Props) {
  const { className } = props

  return (
    <Wrapper className={className}>
      <Button onClick={onMinimize}>
        <Icon name='subtract-line' />
      </Button>
      <Button onClick={onClose}>
        <Icon name='close-line' />
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  -webkit-app-region: no-drag;
`

const Button = styled.div`
  display: inline-flex;
  width: ${(p) => p.theme.windowActions.width};
  height: ${(p) => p.theme.windowActions.height};
  align-items: center;
  justify-content: center;
  transition: background 0.3s, color 0.3s;

  ${(p) => style('color', p.theme.windowActions.color, ['', 'hover', 'active'])}
  ${(p) => style('background', p.theme.windowActions.background, ['', 'hover', 'active'])}
`
