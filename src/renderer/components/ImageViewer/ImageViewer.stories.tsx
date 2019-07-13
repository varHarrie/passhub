import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { useCallback, useRef } from 'react'

import ImageViewer from '.'
import usePreview from './usePreview'

const src = 'https://dummyimage.com/600x400'

function MyComponent () {
  const refImage = useRef<HTMLImageElement>()
  const preview = usePreview()

  const onClick = useCallback(() => {
    preview(refImage.current)
  }, [preview])

  return <img ref={refImage} src={src} style={{ width: 300 }} onClick={onClick} />
}

storiesOf('ImageViewer', module).add('default', () => (
  <ImageViewer>
    <MyComponent />
  </ImageViewer>
))
