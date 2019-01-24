import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router'

import EntryList from '../../containers/EntryList'
import EntryView from '../EntryView'
import { styled } from '../../styles'

export interface Props extends RouteComponentProps<{ groupId: string }> {}

export interface State {}

export default class GroupView extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {}

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <EntryList />
        <Divider />
        <Route path='/:groupId/:entryId' component={EntryView} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
`

const Divider = styled.div`
  width: ${(p) => p.theme.divider.size};
  background: ${(p) => p.theme.divider.background};
`
