import * as uuid from 'uuid'
import { RouteComponentProps } from 'react-router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Button from '../../components/Button'
import DropdownMenu from '../../components/DropdownMenu'
import FieldItem from '../../components/FieldItem'
import Icon from '../../components/Icon'
import ScrollArea from '../../components/ScrollArea'
import useRouter from '../../hooks/useRouter'
import { styled, css } from '../../styles'
import { selectEntry, useDispatch, updateEntry } from '../../store/actions'
import { RootState } from '../../store'
import { FieldType } from '../../models/field'
import { MenuOption } from '../../components/Menu/MenuItem'
import { Entry } from '../../models/entry'
import Input from '../../components/Input'

const menus: MenuOption<FieldType>[] = [
  { icon: 'Type', title: 'Text', data: FieldType.text },
  { icon: 'Lock', title: 'Password', data: FieldType.password }
]

export interface Params {
  groupId: string
  entryId: string
  editable?: string
}

export interface Props {
  entry: Entry
}

// function useCacheState (newState, inputs) {
//   const [state, setState] = useState(newState)

// }

export default function EntryDetailView (props: Props) {
  const { match, history } = useRouter<Params>()
  const { groupId, entryId } = match.params

  const editable = !!match.params.editable
  const dispatch = useDispatch()

  const [entry, setEntry] = useState(props.entry)

  const onEdit = useCallback(() => {
    history.push(`/${groupId}/${entryId}/editable`)
  }, [])

  const onSave = useCallback(() => {
    const { id, ...attrs } = entry
    dispatch(updateEntry(id, attrs))
    history.push(`/${groupId}/${entryId}`)
  }, [entry])

  const onCancel = useCallback(() => {
    setEntry(props.entry)
    history.push(`/${groupId}/${entryId}`)
  }, [props.entry])

  const onMenuClick = useCallback(
    (e: React.MouseEvent, type: FieldType) => {
      setEntry((en) => ({
        ...en,
        fields: [...en.fields, createField(entry.id, type)]
      }))
    },
    [entry]
  )
  const onTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setEntry((en) => ({ ...en, title }))
  }, [])

  const onFieldChange = useCallback((field) => {
    setEntry((en) => {
      const index = en.fields.findIndex((f) => f.id === field.id)
      const newFields = [...en.fields]
      newFields.splice(index, 1, field)
      return { ...en, fields: newFields }
    })
  }, [])

  const onFieldRemove = useCallback((field) => {
    setEntry((e) => ({ ...e, fields: e.fields.filter((f) => f.id !== field.id) }))
  }, [])

  const onFieldCopy = useCallback((field) => {
    console.log('copy', field)
  }, [])

  // useEffect(() => {
  //   setEntry(props.entry)
  // }, [editable])

  return (
    <Wrapper>
      {entry && (
        <Header>
          <Icon type={entry.icon} size='large' />
          <TitleInput value={entry.title} disabled={!editable} onChange={onTitleChange} />
        </Header>
      )}
      <Container>
        <Inner>
          {entry.fields.map((f) => (
            <FieldItem
              key={f.id}
              data={f}
              editable={editable}
              onChange={onFieldChange}
              onCopy={onFieldCopy}
              onRemove={onFieldRemove}
            />
          ))}
        </Inner>
      </Container>
      <Footer>
        {!editable && (
          <Button onClick={onEdit}>
            <Icon type='Edit' />
          </Button>
        )}
        {editable && (
          <Button onClick={onSave}>
            <Icon type='Check' />
          </Button>
        )}
        {editable && (
          <Button onClick={onCancel}>
            <Icon type='X' />
          </Button>
        )}
        {editable && (
          <DropdownMenu position='top-start' items={menus} onClick={onMenuClick}>
            <Button>
              <Icon type='Plus' />
            </Button>
          </DropdownMenu>
        )}
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background: ${(p) => p.theme.entry.background};
`

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 100px 0 14px;
  height: 56px;
  color: #999;
  -webkit-app-region: drag;
`

const TitleInput = styled(Input)`
  margin-left: 8px;
  flex: 1;
  -webkit-app-region: no-drag;

  ${(p) =>
    p.disabled &&
    css`
      padding: 0;
      border-color: transparent;
    `}
`

const Container = styled(ScrollArea)`
  flex: 1;
  min-height: 0;
`

const Inner = styled.div`
  padding: 8px 14px 60px;
`

const Footer = styled.div`
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: flex;
  flex-direction: row-reverse;

  & > button,
  & > span {
    margin-left: 8px;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  }
`

function createField (entryId: string, type: FieldType) {
  return {
    type,
    entryId,
    id: uuid.v4(),
    title: '',
    value: '',
    createdAt: Date.now(),
    modifiedAt: Date.now()
  }
}