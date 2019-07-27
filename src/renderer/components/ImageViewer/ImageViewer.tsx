import styled from 'styled-components'
import { Fragment, useCallback, useRef } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'

import useDragging from '../../hooks/useDragging'
import Button from '../Button'
import Icon from '../Icon'
import ImageContext from './ImageContext'
import { createImageViewerStore } from './createImageViewerStore'

export interface Props {
  children: React.ReactNode
}

export default observer(function ImageViewer (props: Props) {
  const { children } = props

  const refImage = useRef<HTMLImageElement>()
  const refFloatingImage = useRef<HTMLImageElement>()
  const store = useLocalStore(createImageViewerStore)

  const show = useCallback((el: HTMLImageElement) => {
    const { width, height, top, left } = el.getBoundingClientRect()
    const { naturalWidth, naturalHeight } = el
    const { innerWidth, innerHeight } = window

    refImage.current = el
    el.style.opacity = '0'

    store.show(
      el.src,
      {
        scale: width / naturalWidth,
        translate: { x: 0, y: 0 },
        position: {
          left: left + (width - naturalWidth) / 2,
          top: top + (height - naturalHeight) / 2
        }
      },
      {
        translate: {
          x: (innerWidth - width) / 2 - left,
          y: (innerHeight - height) / 2 - top
        }
      }
    )
  }, [])

  const onHide = useCallback(async () => {
    await store.hide(300)
    refImage.current.style.opacity = '1'
  }, [])

  const onPreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  const onStopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const onZoomIn = useCallback(() => {
    store.zoomIn()
  }, [])

  const onZoomOut = useCallback(() => {
    store.zoomOut()
  }, [])

  useDragging(
    refFloatingImage,
    (e, p) => store.offset(e.clientX - p.x, e.clientY - p.y),
    () => store.applyOffset()
  )

  return (
    <Fragment>
      <ImageContext.Provider value={show}>{children}</ImageContext.Provider>
      {store.domVisible && (
        <Wrapper visible={store.visible} onClick={onHide}>
          <Image
            ref={refFloatingImage}
            src={store.src}
            style={store.style}
            onMouseDown={onPreventDefault}
            onClick={onStopPropagation}
          />
          <Actions visible={store.visible} onClick={onStopPropagation}>
            <Button solid onClick={onZoomIn}>
              <Icon name='zoom-in-line' />
            </Button>
            <Button solid onClick={onZoomOut}>
              <Icon name='zoom-out-line' />
            </Button>
            <Button solid>
              <Icon name='close-line' onClick={onHide} />
            </Button>
          </Actions>
        </Wrapper>
      )}
    </Fragment>
  )
})

const Wrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 8;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, ${(p) => (p.visible ? 0.9 : 0)});
  transition: all 0.3s;
`

const Image = styled.img`
  position: absolute;
  user-select: none;
  transform-origin: center center;
  will-change: transform, top, left;
`

const Actions = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transition: opacity 0.3s;

  & > button:not(:first-child) {
    display: block;
    margin-top: 8px;
  }
`
