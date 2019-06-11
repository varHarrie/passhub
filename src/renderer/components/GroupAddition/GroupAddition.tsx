import { useCallback, useEffect, useRef, useState } from 'react'

import GroupItem from '../GroupItem'
import Icon from '../Icon'
import Input from '../Input'
import { noop } from '../../libs/utils'
import { IconType } from '../../models/base'
import { styled } from '../../styles'

export interface Props {
  className?: string
  editable?: boolean
  icon?: IconType
  title?: string
  onConfirm?: (icon: IconType, title: string) => void
}

export default function GroupAddition (props: Props) {
  const { className, onConfirm = noop } = props

  const refInput = useRef<HTMLInputElement>(null)
  const [editable, setEditable] = useState(props.editable || false)
  const [icon, setIcon] = useState<IconType>(props.icon || 'Archive')
  const [title, setTitle] = useState(props.title || '')

  const onEditStart = useCallback(() => {
    setEditable(true)
    setIcon('Archive')
    setTitle('')
  }, [])

  const onTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.trim())
  }, [])

  const onInputBlur = useCallback(() => {
    if (!title) return

    onConfirm(icon, title)
    setEditable(false)
  }, [icon, title])

  const onInputKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const keyCode = e.keyCode

      if (keyCode !== 13) return
      if (!title) return

      onConfirm(icon, title)
      setEditable(false)
    },
    [icon, title]
  )

  useEffect(() => {
    if (editable) {
      const $input = refInput.current
      if ($input) $input.focus()
    }
  }, [editable])

  return (
    <Wrapper className={className}>
      {editable ? (
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
      ) : (
        <GroupItem data={{ id: '', icon: 'Plus', title: 'New' }} onClick={onEditStart} />
      )}
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
