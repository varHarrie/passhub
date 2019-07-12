import { useContext } from 'react'

import ImageContext from './ImageContext'

export default function usePreview () {
  return useContext(ImageContext)
}
