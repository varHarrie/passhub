import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useMappedState } from 'redux-react-hook'

import FieldAddition from '../../components/FieldAddition'
import FieldItem from '../../components/FieldItem'
import Icon from '../../components/Icon'
import ScrollArea from '../../components/ScrollArea'
import { styled } from '../../styles'
import { RootState } from '../../store'
import {
  addField,
  removeFieldWithoutSave,
  updateFieldWithoutSave,
  useDispatch
} from '../../store/actions'
import { FieldType } from '../../models/field'

export interface Props
  extends RouteComponentProps<{ groupId: string; entryId: string }> {}

function Editor (props: Props) {
  const mapState = React.useCallback(
    (state: RootState) => ({
      entry: state.entry,
      fields: state.fields
    }),
    []
  )

  const { entry, fields } = useMappedState(mapState)
  const dispatch = useDispatch()

  const onEntryAdd = React.useCallback((e, type: FieldType) => {
    dispatch(addField(type))
  }, [])

  const onFieldChange = React.useCallback(
    (field) => {
      const index = fields.findIndex((f) => f.id === field.id)
      dispatch(updateFieldWithoutSave(index, field))
    },
    [fields]
  )

  const onFieldCopy = React.useCallback((field) => {
    console.log('copy', field)
  }, [])

  const onFieldRemove = React.useCallback((field) => {
    dispatch(removeFieldWithoutSave(field.id))
  }, [])

  const items = fields.map((f, i) => (
    <FieldItem
      key={f.id}
      data={f}
      onChange={onFieldChange}
      onCopy={onFieldCopy}
      onRemove={onFieldRemove}
    />
  ))

  return (
    <Wrapper>
      <Header>{entry && <Icon type={entry.icon} size='large' />}</Header>
      <Container>
        <Inner>{items}</Inner>
      </Container>
      {entry && <FieldAddition onAdd={onEntryAdd} />}
    </Wrapper>
  )
}

export default withRouter(Editor)

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background: ${(p) => p.theme.editor.background};
`

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 14px;
  height: 56px;
  color: #999;
  -webkit-app-region: drag;
`

const Container = styled(ScrollArea)`
  flex: 1;
  min-height: 0;
`

const Inner = styled.div`
  padding: 8px 14px 60px;
`
