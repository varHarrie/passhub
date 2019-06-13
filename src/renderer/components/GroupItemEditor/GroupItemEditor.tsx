import { useCallback, useEffect, useRef, useState } from 'react'

import Icon from '../Icon'
import Input from '../Input'
import { noop } from '../../libs/utils'
import { IconType } from '../../models/base'
import { styled } from '../../styles'

export interface Props {
  className?: string
  icon?: IconType
  title?: string
  onConfirm?: (icon: IconType, title: string) => void
}

export default function GroupItemEditor (props: Props) {
  const { className, onConfirm = noop } = props

  const refInput = useRef<HTMLInputElement>(null)
  const [icon, setIcon] = useState(props.icon || 'Archive')
  const [title, setTitle] = useState(props.title || '')

  const onTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.trim())
  }, [])

  const onInputBlur = useCallback(() => {
    onConfirm(icon, title)
  }, [icon, title])

  const onInputKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode !== 13) return
      onConfirm(icon, title)
    },
    [icon, title]
  )

  useEffect(() => {
    const $input = refInput.current
    if ($input) $input.focus()
  }, [])

  return (
    <Wrapper className={className}>
      <CenteredInput
        ref={refInput}
        value={title}
        placeholder='Group Title'
        prefix={<Icon type={icon} />}
        suffix={<Icon type='CornerDownLeft' />}
        onChange={onTitleChange}
        onBlur={onInputBlur}
        onKeyDown={onInputKeydown}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${(p) => p.theme.sidebar.itemHeight};
`

const CenteredInput = styled(Input)`
  margin: 0 8px;
  display: flex;
`
