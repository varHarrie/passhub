import styled, { css } from 'styled-components'
import { useCallback, useRef } from 'react'

import parseClipboardEvent from '../../libs/parseClipboardEvent'
import { noop } from '../../libs/utils'
import { usePreview } from '../ImageViewer'

interface Props {
  value: string
  disabled?: boolean
  onChange: (value: string) => void
}

export default function ImageAttachment (props: Props) {
  const { value, disabled, onChange } = props

  const refImage = useRef<HTMLImageElement>()
  const preview = usePreview()

  const onPaste = useCallback(
    async (e: React.ClipboardEvent) => {
      const data = await parseClipboardEvent(e)

      if (data && data.type === 'image') {
        onChange(data.content)
      }
    },
    [onChange]
  )

  const onPreview = useCallback(() => {
    preview(refImage.current)
  }, [])

  return (
    <Wrapper disabled={disabled}>
      {value ? (
        <Image ref={refImage} src={value} onDoubleClick={onPreview} />
      ) : (
        <Placeholder>Paste the image here</Placeholder>
      )}
      <Input value={value} disabled={disabled} onPaste={onPaste} onChange={noop} />
    </Wrapper>
  )
}

const Wrapper = styled.label<{ disabled?: boolean }>`
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  white-space: nowrap;
  user-select: none;
  transition: all 0.3s;

  &:focus-within {
    border: 1px solid #999;
    box-shadow: 0 0 0 3px #eee;
  }

  ${(p) =>
    p.disabled &&
    css`
      padding: 0;
      border-color: transparent;

      &:hover {
        background: #f6f6f6;
      }
    `}
`

const Input = styled.input`
  padding: 0;
  margin: 0;
  width: 0;
  height: 0;
  opacity: 0;
  border: none;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const Placeholder = styled.span``
