import { createHashHistory } from 'history'
import { useMemo } from 'react'
import { Router } from 'react-router'

import { styled } from '../../styles'
import { useConfirm } from '../ModalProvider'

export interface Props {
  children: React.ReactNode
}

export default function HashRouter (props: Props) {
  const confirm = useConfirm()
  const history = useMemo(
    () =>
      createHashHistory({
        getUserConfirmation (content, callback) {
          confirm({
            title: 'Confirm',
            content,
            onConfirm () {
              callback(true)
            },
            onCancel () {
              callback(false)
            }
          })
        }
      }),
    []
  )

  return <Router history={history}>{props.children}</Router>
}
