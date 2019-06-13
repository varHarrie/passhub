import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import Icon from '../Icon'
import { styled } from '../../styles'
import { RootState } from '../../store'

const mapState = (state: RootState) => ({
  app: state.app
})

export interface Props {}

export default function SaveTip (props: Props) {
  const { app } = useSelector(mapState)

  return (
    <Wrapper visible={app.saving}>
      <Icon type='RotateCw' rotating />
      <Title>Saving...</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  display: flex;
  right: 16px;
  bottom: 16px;
  color: #999;
  user-select: none;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transition: opacity 0.5s;
`

const Title = styled.div`
  margin-left: 8px;
`
