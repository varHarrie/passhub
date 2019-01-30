import * as React from 'react'

import useClickOutside from '../../hooks/useClickOutside'
import Button from '../Button'
import Icon from '../Icon'
import Menu from '../Menu'
import { styled } from '../../styles'
import { FieldType } from '../../models/field'

export interface Props {
  onAdd: (type: FieldType) => void
}

export default function FieldAddition (props: Props) {
  const { onAdd } = props

  const refButton = React.useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = React.useState<boolean>(false)

  useClickOutside(refButton, () => {
    setVisible(false)
  })

  const onButtonClick = React.useCallback(() => {
    setVisible(!visible)
  }, [visible])

  return (
    <Wrapper>
      <Button ref={refButton} onClick={onButtonClick}>
        <Icon type='Plus' />
      </Button>
      <StyledMenu visible={visible}>
        <Menu.Item
          icon='Type'
          title='Text'
          onClick={() => onAdd(FieldType.text)}
        />
        <Menu.Item
          icon='Lock'
          title='Password'
          onClick={() => onAdd(FieldType.password)}
        />
      </StyledMenu>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 14px;
  right: 14px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
`

const StyledMenu = styled(Menu)<{ visible: boolean }>`
  position: fixed;
  right: 14px;
  bottom: 52px;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transform: scaleY(${(p) => (p.visible ? 1 : 0)});
  transform-origin: bottom;
  transition: all 0.2s;
`
