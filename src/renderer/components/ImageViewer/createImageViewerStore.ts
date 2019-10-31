import { toJS } from 'mobx'

type Meta = {
  scale: number
  position: { left: number; top: number }
  translate: { x: number; y: number }
  offset: { x: number; y: number }
}

type ImageViewerStore = {
  src: string
  visible: boolean
  domVisible: boolean
  animating: boolean
  meta?: Meta
  cacheMeta?: Meta
  style: React.CSSProperties
  scaleText: string
  show: (src: string, source: Partial<Meta>, target: Partial<Meta>) => Promise<void>
  hide: (duration: number) => Promise<void>
  zoomIn: () => void
  zoomOut: () => void
  offset: (x: number, y: number) => void
  applyOffset: () => void
}

export function createImageViewerStore () {
  const store: ImageViewerStore = {
    src: '',
    visible: false,
    domVisible: false,
    animating: false,
    get style () {
      const {
        scale,
        position: { top, left },
        translate: { x, y },
        offset: { x: oX, y: oY }
      } = this.meta

      return {
        top,
        left,
        transform: `translate3d(${x + oX}px, ${y + oY}px, 0) scale(${scale})`,
        transition: this.animating ? `transform 0.3s` : undefined
      }
    },
    get scaleText () {
      return (this.meta.scale * 100).toFixed(0) + '%'
    },
    show (src, source, target) {
      return new Promise((resolve) => {
        this.domVisible = true
        this.src = src
        this.meta = { ...source, translate: { x: 0, y: 0 }, offset: { x: 0, y: 0 } }
        this.cacheMeta = toJS(this.meta)

        requestAnimationFrame(() => {
          this.visible = true
          this.animating = true
          this.meta = { ...toJS(this.meta), ...target, scale: 1 }

          resolve()
        })
      })
    },
    hide (duration) {
      return new Promise((resolve) => {
        this.visible = false
        this.animating = true
        this.meta = this.cacheMeta

        setTimeout(() => {
          this.domVisible = false
          this.animating = false

          resolve()
        }, duration)
      })
    },
    zoomIn () {
      if (this.meta.scale < 2) {
        this.animating = true
        this.meta.scale += 0.25
      }
    },
    zoomOut () {
      if (this.meta.scale > 0.25) {
        this.animating = true
        this.meta.scale -= 0.25
      }
    },
    offset (x, y) {
      this.animating = false
      this.meta.offset = { x, y }
    },
    applyOffset () {
      const { x, y } = this.meta.offset
      this.meta.translate.x += x
      this.meta.translate.y += y
      this.meta.offset = { x: 0, y: 0 }
    }
  }

  return store
}
