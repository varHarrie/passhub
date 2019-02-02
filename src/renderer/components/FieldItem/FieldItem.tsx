import * as React from 'react'

import PasswordInput from './PasswordInput'
import TextInput from './TextInput'
import { Field, FieldType } from '../../models/field'
import { styled } from '../../styles'

interface Props {
  data: Field
  onChange: (data: Field) => void
  onCopy: (data: Field) => void
}

export default function FieldItem (props: Props) {
  const { data, onChange, onCopy } = props

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

  const Control = data.type === FieldType.password ? PasswordInput : TextInput

  return (
    <Wrapper>
      <Header value={data.title} onChange={onTitleChange} />
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

const Header = styled.input`
  border: none;
  outline: none;
  color: #999;
`

const Container = styled.div`
  margin-top: 8px;
`
