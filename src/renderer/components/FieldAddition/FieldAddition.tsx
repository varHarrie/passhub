import { useCallback, useRef, useState } from 'react'

import useClickOutside from '../../hooks/useClickOutside'
import Button from '../Button'
import Icon from '../Icon'
import Menu from '../Menu'
import { styled } from '../../styles'
import { FieldType } from '../../models/field'

export interface Props {
  onAdd: (e: React.MouseEvent, type: FieldType) => void
}

export default function FieldAddition (props: Props) {
  const { onAdd } = props

  const refButton = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)

  useClickOutside(refButton.current, () => {
    setVisible(false)
  })

  const onButtonClick = useCallback(() => {
    setVisible(!visible)
  }, [visible])

  return (
    <Wrapper>
      <Button ref={refButton} onClick={onButtonClick}>
        <Icon type='Plus' />
      </Button>
      <StyledMenu visible={visible}>
        <Menu.Item icon='Type' title='Text' data={FieldType.text} onClick={onAdd} />
        <Menu.Item icon='Lock' title='Password' data={FieldType.password} onClick={onAdd} />
      </StyledMenu>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: 14px;
  bottom: 14px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
`

const StyledMenu = styled(Menu)<{ visible: boolean }>`
  position: absolute;
  left: 0;
  bottom: 40px;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transform: scaleY(${(p) => (p.visible ? 1 : 0)});
  transform-origin: bottom;
  transition: all 0.2s;
`
