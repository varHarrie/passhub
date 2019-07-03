import { useCallback, useEffect, useRef, useState } from 'react'

import Icon from '../Icon'
import IconSelector from '../IconSelector'
import Input from '../Input'
import { noop } from '../../libs/utils'
import { styled } from '../../styles'
import { IconName } from '../../models/icon'

export interface Props {
  className?: string
  icon?: IconName
  title?: string
  onConfirm?: (icon: IconName, title: string) => void
}

export default function GroupItemEditor (props: Props) {
  const { className, onConfirm = noop } = props

  const refInput = useRef<HTMLInputElement>(null)
  const [icon, setIcon] = useState<IconName>(props.icon || 'folder-line')
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
        prefix={
          <IconSelector value={icon} onChange={setIcon}>
            <Icon name={icon} />
          </IconSelector>
        }
        suffix={<Icon name='arrow-left-line' />}
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
