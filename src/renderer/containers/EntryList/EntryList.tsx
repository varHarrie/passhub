import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { observer } from 'mobx-react'

import Button from '../../components/Button'
import EntryItem from '../../components/EntryItem'
import Icon from '../../components/Icon'
import Input from '../../components/Input'
import ScrollArea from '../../components/ScrollArea'
import { styled } from '../../styles'
import { appStore } from '../../stores'
import { Entry } from '../../models/entry'

export interface Props extends RouteComponentProps<{ groupId: string }> {}

export interface State {}

@observer
class EntryList extends React.Component<Props, State> {
  private onEntryAdd = async () => {
    const entry = await appStore.addEntry()
    if (!entry) return

    appStore.selectEntry(entry.id)
  }

  private onEntrySelect = (entry: Entry) => {
    appStore.selectEntry(entry.id)

    const groupId = this.props.match.params.groupId
    this.props.history.push(`/${groupId}/${entry.id}`)
  }

  public render () {
    const entries = appStore.entries.map((entry) => (
      <EntryItem
        key={entry.id}
        data={entry}
        active={!!appStore.entry && appStore.entry.id === entry.id}
        onClick={this.onEntrySelect}
      />
    ))

    return (
      <Wrapper>
        <Header>
          <SearchInput solid prefix={<Icon type='Search' />} />
          <SearchButton solid onClick={this.onEntryAdd}>
            <Icon type='Plus' />
          </SearchButton>
        </Header>
        <Container>{entries}</Container>
      </Wrapper>
    )
  }
}

export default withRouter(EntryList)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(p) => p.theme.list.width};
  background: ${(p) => p.theme.list.background};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 14px;
  height: 56px;
  -webkit-app-region: drag;
`

const SearchInput = styled(Input)`
  flex: 1;
  -webkit-app-region: no-drag;
`

const SearchButton = styled(Button)`
  margin-left: 10px;
  -webkit-app-region: no-drag;
`

const Container = styled(ScrollArea)`
  flex: 1;
  min-height: 0;
`
