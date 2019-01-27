import * as React from 'react'

import Icon from '../Icon'
import Input from '../Input'

interface Props {
  value: string
  onChange: React.ChangeEventHandler
  onCopy: React.MouseEventHandler
}

export default function TextInput (props: Props) {
  const { value, onChange, onCopy } = props

  const icon = 'Type'

  return (
    <Input
      value={value}
      onChange={onChange}
      prefix={<Icon type={icon} />}
      suffix={<Icon type='Copy' onClick={onCopy} />}
    />
  )
}
