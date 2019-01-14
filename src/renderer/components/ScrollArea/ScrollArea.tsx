import * as React from 'react'

import { styled } from '../../styles'

type ScrollState = 'normal' | 'top' | 'center' | 'bottom'

export interface Props {
  className?: string
  children?: React.ReactNode
}

export interface State {
  state: ScrollState
}

export default class ScrollArea extends React.Component<Props, State> {
  private refContainer = React.createRef<HTMLDivElement>()

  public state: State = {
    state: 'normal'
  }

  public componentDidMount () {
    const $container = this.refContainer.current
    if (!$container) return

    $container.addEventListener('scroll', this.onUpdate)
    window.addEventListener('resize', this.onUpdate)
  }

  public componentWillUnmount () {
    const $container = this.refContainer.current
    if (!$container) return

    $container.removeEventListener('scroll', this.onUpdate)
    window.removeEventListener('resize', this.onUpdate)
  }

  private onUpdate = () => {
    const $container = this.refContainer.current
    if (!$container) return

    const { scrollTop, scrollHeight, clientHeight } = $container
    const state =
      scrollHeight === clientHeight
        ? 'normal'
        : scrollTop === 0
        ? 'top'
        : scrollTop < scrollHeight - clientHeight
        ? 'center'
        : 'bottom'

    this.setState({ state })
  }

  public render () {
    const { className, children } = this.props
    const { state } = this.state

    return (
      <Wrapper className={className}>
        <TopShadow visible={state === 'center' || state === 'bottom'} />
        <Container ref={this.refContainer}>{children}</Container>
        <BottomShadow visible={state === 'center' || state === 'top'} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
`

const TopShadow = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(p) => (p.visible ? '6px' : 0)};
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  transition: height 0.3s;
`

const BottomShadow = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(p) => (p.visible ? '6px' : 0)};
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  transition: height 0.3s;
`

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`
