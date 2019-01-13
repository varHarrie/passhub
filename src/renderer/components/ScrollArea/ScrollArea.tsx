import * as React from 'react'

import { styled } from '../../styles'

export interface Props {
  className?: string
  children?: React.ReactNode
}

export interface State {}

export default class ScrollArea extends React.Component<Props, State> {
  public render () {
    const { className, children } = this.props

    return (
      <Wrapper className={className}>
        <TopShadow />
        <Container>{children}</Container>
        <BottomShadow />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
`

const TopShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`

const BottomShadow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`
