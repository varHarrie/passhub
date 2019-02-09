import * as React from 'react'

import Icon from '../Icon'
import PasswordInput from './PasswordInput'
import TextInput from './TextInput'
import { Field, FieldType } from '../../models/field'
import { styled } from '../../styles'

interface Props {
  data: Field
  onChange: (data: Field) => void
  onCopy: (data: Field) => void
  onRemove: (data: Field) => void
}

export default function FieldItem (props: Props) {
  const { data, onChange, onCopy, onRemove } = props

  const onTitleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value
      onChange({ ...data, title })
    },
    [data]
  )

  const onValueChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      onChange({ ...data, value })
    },
    [data]
  )

  const onValueCopy = React.useCallback(() => {
    onCopy(data)
  }, [data])

  const onFieldRemove = React.useCallback(() => {
    onRemove(data)
  }, [data])

  const Control = data.type === FieldType.password ? PasswordInput : TextInput

  return (
    <Wrapper>
      <Header>
        <Title value={data.title} onChange={onTitleChange} />
        <Actions>
          <Icon type='X' onClick={onFieldRemove} />
        </Actions>
      </Header>
      <Container>
        <Control
          value={data.value}
          onChange={onValueChange}
          onCopy={onValueCopy}
        />
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
  }
`

const Title = styled.input`
  flex: 1;
  border: none;
  outline: none;
`

const Actions = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
`

const Header = styled.div`
  display: flex;
  color: #999;

  &:hover ${Actions} {
    opacity: 1;
  }
`

const Container = styled.div`
  margin-top: 8px;
`
