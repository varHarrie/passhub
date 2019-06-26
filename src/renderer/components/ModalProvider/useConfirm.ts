import { useCallback, useContext } from 'react'

import ConfirmModal from '../Modal/ConfirmModal'
import ModalContext from './ModalContext'
import { noop } from '../../libs/utils'

interface ConfirmOptions {
  title?: string
  content?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export default function useConfirm () {
  const store = useContext(ModalContext)
  return useCallback((options: ConfirmOptions) => {
    const { content, onConfirm = noop, onCancel = noop, ...rest } = options

    let id: string

    const onModalConfirm = () => {
      store.hide(id)
      onConfirm()
    }

    const onModalCancel = () => {
      store.hide(id)
      onCancel()
    }

    id = store.create(ConfirmModal, {
      ...rest,
      children: content,
      onConfirm: onModalConfirm,
      onCancel: onModalCancel
    })
  }, [])
}
