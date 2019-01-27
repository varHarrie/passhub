import * as React from 'react'

import Button from '../../components/Button'
import Icon from '../../components/Icon'
import Menu from '../../components/Menu/Menu'
import useClickOutside from '../../hooks/useClickOutside'
import { styled } from '../../styles'
import { FieldType } from '../../models/field'

export interface Props {
  onClick: (type: FieldType) => void
}

export function AddButton (props: Props) {
  const { onClick } = props

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
          onClick={() => onClick(FieldType.text)}
        />
        <Menu.Item
          icon='Lock'
          title='Password'
          onClick={() => onClick(FieldType.password)}
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
