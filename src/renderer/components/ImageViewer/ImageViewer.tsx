import { Fragment, useCallback, useRef, useState } from 'react'

import Button from '../Button'
import Icon from '../Icon'
import ImageContext from './ImageContext'
import { styled } from '../../styles'

export interface Props {
  children: React.ReactNode
}

export default function ImageViewer (props: Props) {
  const { children } = props
  const refImage = useRef<HTMLImageElement>()
  const refSourceStyle = useRef<React.CSSProperties>({})

  const [src, setSrc] = useState('')
  const [visible, setVisible] = useState(false)
  const [domVisible, setDomVisible] = useState(false)
  const [style, setStyle] = useState<React.CSSProperties>({})

  const show = useCallback((el: HTMLImageElement) => {
    const { width, height, top, left } = el.getBoundingClientRect()
    const { naturalWidth, naturalHeight } = el
    const { innerWidth, innerHeight } = window

    const scale = width / naturalWidth

    refSourceStyle.current = {
      left: left + (width - naturalWidth) / 2,
      top: top + (height - naturalHeight) / 2,
      transform: `translate3d(0px, 0px, 0px) scale(${scale})`
    }

    setSrc(el.src)
    setDomVisible(true)
    setStyle(refSourceStyle.current)

    setTimeout(() => {
      const deltaX = (innerWidth - width) / 2 - left
      const deltaY = (innerHeight - height) / 2 - top

      setVisible(true)
      setStyle({
        ...refSourceStyle.current,
        transform: `translate3d(${deltaX}px, ${deltaY}px, 0px) scale(1)`
      })
    }, 10)
  }, [])

  const onHide = useCallback(() => {
    setVisible(false)
    setStyle(refSourceStyle.current)

    setTimeout(() => {
      setDomVisible(false)
    }, 300)
  }, [])

  // const onStopPropagation = useCallback((e: React.MouseEvent) => {
  //   e.stopPropagation()
  // }, [])

  // const onZoomIn = useCallback(() => {
  //   //
  // }, [])

  // const onZoomOut = useCallback(() => {
  //   //
  // }, [])

  return (
    <Fragment>
      <ImageContext.Provider value={show}>{children}</ImageContext.Provider>
      {domVisible && (
        <Wrapper visible={visible} onClick={onHide}>
          <Image ref={refImage} src={src} style={style} />
          {/* <Actions visible={visible} onClick={onStopPropagation}>
            <Button solid onClick={onZoomIn}>
              <Icon name='zoom-in-line' />
            </Button>
            <Button solid onClick={onZoomOut}>
              <Icon name='zoom-out-line' />
            </Button>
            <Button solid>
              <Icon name='close-line' onClick={onHide} />
            </Button>
          </Actions> */}
        </Wrapper>
      )}
    </Fragment>
  )
}

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
  transition: transform 0.3s;
  will-change: transform, top, left;
`

// const Actions = styled.div<{ visible: boolean }>`
//   position: absolute;
//   bottom: 20px;
//   right: 20px;
//   opacity: ${(p) => (p.visible ? 1 : 0)};
//   transition: opacity 0.3s;

//   & > button:not(:first-child) {
//     display: block;
//     margin-top: 8px;
//   }
// `
