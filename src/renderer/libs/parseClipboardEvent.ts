type ClipboardResult = {
  type: 'text' | 'image'
  content: string
}

export default function parseClipboardEvent (e: ClipboardEvent | React.ClipboardEvent) {
  return new Promise<ClipboardResult | null>((resolve) => {
    const item = e.clipboardData && e.clipboardData.items[0]
    const type = (item && item.type) || ''

    if (type.match('text/plain')) {
      item.getAsString((content) => resolve({ type: 'text', content }))
    } else if (type.match('image/')) {
      const blob = item.getAsFile()
      const reader = new FileReader()

      reader.onload = () => resolve({ type: 'image', content: reader.result.toString() })
      reader.readAsDataURL(blob)
    } else {
      resolve(null)
    }
  })
}
