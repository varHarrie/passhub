import { useMappedState } from 'redux-react-hook'
import { useCallback } from 'react'

import Icon from '../Icon'
import { styled } from '../../styles'
import { RootState } from '../../store'

export interface Props {}

export default function SaveTip (props: Props) {
  const mapState = useCallback(
    (state: RootState) => ({
      app: state.app
    }),
    []
  )

  const { app } = useMappedState(mapState)

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
