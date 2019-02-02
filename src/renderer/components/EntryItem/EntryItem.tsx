import * as React from 'react'

import Icon from '../Icon'
import { Entry } from '../../models/entry'
import { styled } from '../../styles'
import { noop } from '../../libs/utils'

export interface Props {
  className?: string
  data: Entry
  active?: boolean
  onClick?: (entry: Entry) => void
}

export interface State {}

export default function EntryItem (props: Props) {
  const { className, data, active, onClick = noop } = props

  const onEntryClick = React.useCallback(() => {
    onClick(data)
  }, [data])

  return (
    <Wrapper className={className} active={active} onClick={onEntryClick}>
      <StyledIcon type={data.icon} size='medium' />
      <Container>
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
      </Container>
    </Wrapper>
  )
}

/* todo: theme */
const Wrapper = styled.div<{ active?: boolean }>`
  padding: 12px;
  display: flex;
  align-items: center;
  background: ${(p) => (p.active ? '#f6f6f6' : 'transparent')};
  cursor: pointer;
  user-select: none;
  transition: background 0.3s;
`

const StyledIcon = styled(Icon)`
  color: #999;
`

const Container = styled.div`
  margin-left: 12px;
`

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #999;
`

const Description = styled.div`
  font-size: 14px;
  color: #999;
`
