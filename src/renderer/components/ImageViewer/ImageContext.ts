import { createContext } from 'react'

type ImageContextValue = (el: HTMLImageElement) => void

const ImageContext = createContext<ImageContextValue>(null)

export default ImageContext
