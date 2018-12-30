import * as React from 'react'
import { X, Minus } from 'react-feather'

import { styled } from '../../styles'
import { ipcRenderer } from 'electron'

function onMinimize () {
  ipcRenderer.send('minimize')
}

function onClose () {
  ipcRenderer.send('close')
}

export interface WindowActionsProps {}

export default function WindowActions (props: WindowActionsProps) {
  return (
    <Wrapper>
      <Button onClick={onMinimize}>
        <Minus size={14} />
      </Button>
      <Button onClick={onClose}>
        <X size={14} />
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
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
