import * as React from 'react'
import styled from 'styled-components'

import GroupItem from '../GroupItem'
import Icon from '../Icon/Icon'
import Input from '../Input'
import { noop } from '../../libs/utils'
import { IconType } from '../../models/base'

export interface Props {
  onConfirm: (icon: IconType, title: string) => void
}

export interface State {
  editable: boolean
  icon: IconType
  title: string
}

export default class GroupAddition extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    onConfirm: noop
  }

  public state: State = {
    editable: false,
    icon: 'Archive',
    title: ''
  }

  private refInput = React.createRef<Input>()

  private onEditStart = () => {
    this.setState({ editable: true, icon: 'Archive', title: '' }, () => {
      const $input = this.refInput.current
      if ($input) $input.focus()
    })
  }

  private onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value })
  }

  private onInputBlur = () => {
    this.setState({ editable: false })
  }

  private onInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { icon, title } = this.state
    const keyCode = e.keyCode

    if (keyCode !== 13) return
    if (!title) return

    this.props.onConfirm(icon, title)
    this.setState({ editable: false })
  }

  public render () {
    const { editable, icon, title } = this.state

    return (
      <Wrapper>
        {editable ? (
          <CenteredInput
            ref={this.refInput}
            value={title}
            placeholder='Group Title'
            prefix={<Icon type={icon} />}
            suffix={<Icon type='CornerDownLeft' />}
            onChange={this.onTitleChange}
            onBlur={this.onInputBlur}
            onKeyDown={this.onInputKeydown}
          />
        ) : (
          <GroupItem icon='Plus' title='New' onClick={this.onEditStart} />
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${(p) => p.theme.sidebar.itemHeight};
`

const CenteredInput = styled(Input)`
  margin: 0 8px;
  display: flex;
`
