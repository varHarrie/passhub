import styled from 'styled-components'
import { useCallback, useState } from 'react'

import * as password from '../../libs/password'
import Button from '../Button'
import Checkbox from '../Checkbox'
import Input from '../Input'
import Slider from '../Slider'

export interface Props {
  value: string
  onChange?: (value: string) => void
}

export default function PasswordGenerator (props: Props) {
  const { value, onChange } = props

  const [length, onLengthChange] = useState(18)
  const [uppercase, onUppercaseChange] = useState(true)
  const [lowercase, onLowercaseChange] = useState(true)
  const [numbers, onNumbersChange] = useState(true)
  const [symbols, onSymbolsChange] = useState(true)

  const onGenerate = useCallback(() => {
    const result = password.generate(length, { uppercase, lowercase, numbers, symbols })
    onChange(result)
  }, [length, uppercase, lowercase, numbers, symbols, onChange])

  return (
    <Wrapper>
      <Header>
        <Input value={value} disabled />
      </Header>
      <Container>
        <Slider max={64} value={length} onChange={onLengthChange} />
        <Checkbox checked={uppercase} onChange={onUppercaseChange}>
          Uppercase Letters
        </Checkbox>
        <Checkbox checked={lowercase} onChange={onLowercaseChange}>
          Lowercase Letters
        </Checkbox>
        <Checkbox checked={numbers} onChange={onNumbersChange}>
          Numbers
        </Checkbox>
        <Checkbox checked={symbols} onChange={onSymbolsChange}>
          Symbols
        </Checkbox>
      </Container>
      <Footer>
        <Button onClick={onGenerate}>Generate</Button>
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Header = styled.div`
  margin-bottom: 8px;
`

const Container = styled.div``

const Footer = styled.div`
  margin-top: 8px;
  text-align: center;
`
