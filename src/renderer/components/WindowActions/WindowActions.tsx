import { ipcRenderer } from 'electron'

import Icon from '../Icon'
import { styled } from '../../styles'

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
  width: ${(p) => p.theme.window.actionWidth};
  height: ${(p) => p.theme.window.actionHeight};
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.window.actionColor};
  background: ${(p) => p.theme.window.actionBackground};
  transition: background 0.3s, color 0.3s;

  &:hover {
    color: ${(p) => p.theme.window.actionHoverColor};
    background: ${(p) => p.theme.window.actionHoverBackground};
  }

  &:active {
    color: ${(p) => p.theme.window.actionActiveColor};
    background: ${(p) => p.theme.window.actionActiveBackground};
  }
`
