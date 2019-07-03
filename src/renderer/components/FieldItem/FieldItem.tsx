import { useCallback } from 'react'

import Icon from '../Icon'
import PasswordInput from './PasswordInput'
import TextInput from './TextInput'
import { Field, FieldType } from '../../models/field'
import { styled } from '../../styles'

const controls = {
  [FieldType.password]: PasswordInput,
  [FieldType.text]: TextInput
}

interface Props {
  data: Field
  editable?: boolean
  onChange: (data: Field) => void
  onCopy: (data: Field) => void
  onRemove: (data: Field) => void
}

export default function FieldItem (props: Props) {
  const { data, editable, onChange, onCopy, onRemove } = props

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value
      onChange({ ...data, title })
    },
    [data, onChange]
  )

  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      onChange({ ...data, value })
    },
    [data, onChange]
  )

  const onValueGenerate = useCallback(
    (value) => {
      onChange({ ...data, value })
    },
    [data, onChange]
  )

  const onValueCopy = useCallback(() => {
    onCopy(data)
  }, [data, onCopy])

  const onFieldRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])

  const Control = controls[data.type] as any

  return (
    <Wrapper>
      <Header visible={!!data.title || editable}>
        <Title value={data.title} disabled={!editable} onChange={onTitleChange} />
        {editable && (
          <Actions>
            <Icon name='close-line' onClick={onFieldRemove} />
          </Actions>
        )}
      </Header>
      <Container>
        <Control
          value={data.value}
          disabled={!editable}
          onChange={onValueChange}
          onGenerate={onValueGenerate}
          onCopy={onValueCopy}
        />
      </Container>
    </Wrapper>
  )
}

const Actions = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
`

const Wrapper = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
  }

  &:hover ${Actions} {
    opacity: 1;
  }
`

const Title = styled.input`
  flex: 1;
  border: none;
  outline: none;
  color: #aaa;
  height: 100%;

  &[disabled] {
    background: transparent;
  }
`

const Header = styled.div<{ visible: boolean }>`
  display: flex;
  margin-bottom: ${(p) => (p.visible ? '8px' : 0)};
  height: ${(p) => (p.visible ? '16px' : 0)};
  color: #999;
  transition: all 0.3s;
`

const Container = styled.div``
