import { useCallback } from 'react'

import Icon from '../Icon'
import { Entry } from '../../models/entry'
import { styled } from '../../styles'
import { noop } from '../../libs/utils'

export interface Props {
  className?: string
  data: Entry
  active?: boolean
  onClick?: (entry: Entry) => void
  onContextMenu?: (e: React.MouseEvent, entry: Entry) => void
}

export interface State {}

export default function EntryItem (props: Props) {
  const { className, data, active, onClick = noop, onContextMenu = noop } = props

  const onEntryClick = useCallback(() => {
    onClick(data)
  }, [data, onClick])

  const onGroupContextMenu = useCallback(
    (e: React.MouseEvent) => {
      onContextMenu(e, data)
    },
    [data, onContextMenu]
  )

  return (
    <Wrapper
      className={className}
      active={active}
      onClick={onEntryClick}
      onContextMenu={onGroupContextMenu}
    >
      <Header>
        <Icon name={data.icon} size='xl' />
      </Header>
      <Container>
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ active?: boolean }>`
  padding: 12px;
  display: flex;
  align-items: center;
  background: ${(p) => (p.active ? '#f6f6f6' : 'transparent')};
  cursor: pointer;
  user-select: none;
  transition: background 0.3s;
`

const Header = styled.div`
  color: #999;
`

const Container = styled.div`
  margin-left: 12px;
  flex: 1;
  min-width: 0;
`

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Description = styled.div`
  font-size: 14px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
`
