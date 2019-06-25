import { render, unmountComponentAtNode } from 'react-dom'

import ConfirmModal from './ComfirmModal'
import { theme, ThemeProvider } from '../../styles'
import { noop } from '../../libs/utils'

interface ConfirmOptions {
  title?: string
  content?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export function confirm (options: ConfirmOptions) {
  const { title, content, onConfirm = noop, onCancel = noop } = options

  const el = document.createElement('span')
  document.body.appendChild(el)

  const onModalConfirm = () => {
    onConfirm()
    renderModal(false)
  }

  const onModalCancel = () => {
    onCancel()
    renderModal(false)
  }

  const onHidden = () => {
    unmountComponentAtNode(el)
    document.body.removeChild(el)
  }

  const renderModal = (visible: boolean) => {
    const component = (
      <ThemeProvider theme={theme}>
        <ConfirmModal
          visible={visible}
          title={title}
          onHidden={onHidden}
          onConfirm={onModalConfirm}
          onCancel={onModalCancel}
        >
          {content}
        </ConfirmModal>
      </ThemeProvider>
    )

    render(component, el)
  }

  renderModal(true)
}
