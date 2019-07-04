import * as uuid from 'uuid'
import copy from 'copy-text-to-clipboard'
import { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

import Button from '../../components/Button'
import DropdownMenu from '../../components/DropdownMenu'
import FieldItem from '../../components/FieldItem'
import Icon from '../../components/Icon'
import IconSelector from '../../components/IconSelector'
import Input from '../../components/Input'
import ScrollArea from '../../components/ScrollArea'
import usePaste from '../../hooks/usePaste'
import usePrompt from '../../hooks/usePrompt'
import useRouter from '../../hooks/useRouter'
import { css, styled } from '../../styles'
import { Field, FieldType } from '../../models/field'
import { Entry } from '../../models/entry'
import { useAppStore } from '../../store'
import { MenuOption } from '../../components/Menu'
import { useConfirm } from '../../components/ModalProvider'
import { useMessage } from '../../components/MessageProvider'
import { IconName } from '../../models/icon'

const menus: MenuOption<FieldType>[] = [
  { icon: 'text', title: 'Text', data: FieldType.text },
  { icon: 'lock-2-line', title: 'Password', data: FieldType.password }
]

export interface Params {
  groupId: string
  entryId: string
  editable?: string
}

export interface Props {}

export default observer(function EntryDetailView (props: Props) {
  const { match, history, location } = useRouter<Params>()
  const { groupId, entryId } = match.params

  const confirm = useConfirm()
  const message = useMessage()
  const store = useAppStore()
  const editable = !!match.params.editable

  const [entry, setEntry] = useState<Entry>(() => toJS(store.entry))

  const onEdit = useCallback(() => {
    history.push(`/${groupId}/${entryId}/editable`)
  }, [groupId, entryId])

  const onSave = useCallback(() => {
    const { id, ...attrs } = entry
    store.updateEntry(id, attrs)
    history.push(`/${groupId}/${entryId}`)
  }, [entry])

  const onCancel = useCallback(() => {
    setEntry(toJS(store.entry))
    history.push(`/${groupId}/${entryId}`)
  }, [store.entry])

  const onMenuClick = useCallback(
    (e: React.MouseEvent, type: FieldType) => {
      setEntry((en) => ({
        ...en,
        fields: [...en.fields, createField(entry.id, type)]
      }))
    },
    [entry]
  )

  const onIconChange = useCallback((icon: IconName) => {
    setEntry((en) => ({ ...en, icon }))
  }, [])

  const onTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setEntry((en) => ({ ...en, title }))
  }, [])

  const onFieldChange = useCallback((field: Field) => {
    setEntry((en) => {
      const index = en.fields.findIndex((f) => f.id === field.id)
      const newFields = [...en.fields]
      newFields.splice(index, 1, field)
      return { ...en, fields: newFields }
    })
  }, [])

  const onFieldRemove = useCallback((field: Field) => {
    confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this field?',
      onConfirm: () => {
        setEntry((e) => ({ ...e, fields: e.fields.filter((f) => f.id !== field.id) }))
      }
    })
  }, [])

  const onFieldCopy = useCallback((field: Field) => {
    if (field.value) {
      copy(field.value)
      message('check-line', 'Copy!')
    }
  }, [])

  usePaste(
    (e) => {
      const value = e.clipboardData.getData('text/plain')
      if (editable && document.activeElement === document.body && value) {
        setEntry((en) => ({
          ...en,
          fields: [...en.fields, createField(entry.id, FieldType.text, value)]
        }))
      }
    },
    [editable, entry]
  )

  usePrompt(editable, (l) => {
    if (location.pathname.startsWith(l.pathname)) return
    return `Are you sure you want to quit without saving your changes?`
  })

  return (
    <Wrapper>
      {entry && (
        <Header>
          <TitleInput
            value={entry.title}
            disabled={!editable}
            onChange={onTitleChange}
            prefix={
              <IconSelector disabled={!editable} value={entry.icon} onChange={onIconChange}>
                <Icon name={entry.icon} size='lg' />
              </IconSelector>
            }
          />
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
            <Icon name='pencil-line' />
          </Button>
        )}
        {editable && (
          <Button onClick={onSave}>
            <Icon name='check-line' />
          </Button>
        )}
        {editable && (
          <Button onClick={onCancel}>
            <Icon name='close-line' />
          </Button>
        )}
        {editable && (
          <DropdownMenu position='top-start' items={menus} onClick={onMenuClick}>
            <Button>
              <Icon name='add-line' />
            </Button>
          </DropdownMenu>
        )}
      </Footer>
    </Wrapper>
  )
})

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
`

const TitleInput = styled(Input)`
  flex: 1;

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

function createField (entryId: string, type: FieldType, value: string = '') {
  return {
    type,
    value,
    entryId,
    id: uuid.v4(),
    title: '',
    createdAt: Date.now(),
    modifiedAt: Date.now()
  }
}
