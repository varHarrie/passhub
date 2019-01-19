import * as React from 'react'

import Button from '../../components/Button'
import EntryItem from '../../components/EntryItem'
import Icon from '../../components/Icon'
import Input from '../../components/Input'
import ScrollArea from '../../components/ScrollArea'
import { styled } from '../../styles'

export interface Props {}

export interface State {}

export default class List extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {}

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <Header>
          <SearchInput solid prefix={<Icon type='Search' />} />
          <SearchButton solid>
            <Icon type='Plus' />
          </SearchButton>
        </Header>
        <Container>{/* <EntryItem entry={}>test</EntryItem> */}</Container>
      </Wrapper>
    )
  }
}

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
