import styled from 'styled-components'

import Button from '../Button'
import Modal from './Modal'
import { noop } from '../../libs/utils'

import i18n from '../../libs/i18n'

export interface Props {
  title?: React.ReactNode
  visible?: boolean
  children?: React.ReactNode
  target?: Element
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  onHidden?: () => void
}

export default function ConfirmModal (props: Props) {
  const {
    title,
    children,
    confirmText = i18n.t('confirm.confirm'),
    cancelText = i18n.t('confirm.cancel'),
    onConfirm = noop,
    onCancel = noop,
    ...rest
  } = props

  return (
    <Modal
      {...rest}
      header={title}
      footer={
        <Actions>
          <Button onClick={onConfirm}>{confirmText}</Button>
          <Button onClick={onCancel}>{cancelText}</Button>
        </Actions>
      }
      onHide={onCancel}
    >
      {children}
    </Modal>
  )
}

const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;

  & > button {
    margin-left: 8px;
  }
`
