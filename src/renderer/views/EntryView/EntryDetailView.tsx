import * as uuid from 'uuid'
import copy from 'copy-text-to-clipboard'
import styled, { css } from 'styled-components'
import { useCallback, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

import Button from '../../components/Button'
import DropdownMenu from '../../components/DropdownMenu'
import FieldItem from '../../components/FieldItem'
import Icon from '../../components/Icon'
import IconSelector from '../../components/IconSelector'
import Input from '../../components/Input'
import ScrollArea from '../../components/ScrollArea'
import useLanguage from '../../hooks/useLanguage'
import usePaste from '../../hooks/usePaste'
import usePrompt from '../../hooks/usePrompt'
import useRouter from '../../hooks/useRouter'
import useTranslate from '../../hooks/useTranslate'
import parseClipboardEvent from '../../libs/parseClipboardEvent'
import { Field, FieldType } from '../../models/field'
import { Entry } from '../../models/entry'
import { useAppStore } from '../../store'
import { MenuOption } from '../../components/Menu'
import { useConfirm } from '../../components/ModalProvider'
import { useMessage } from '../../components/MessageProvider'
import { IconName } from '../../models/icon'

import i18n from '../../libs/i18n'
function getMenus (): MenuOption<FieldType>[] {
  return [
    { icon: 'text', title: i18n.t('entry.menu.text'), data: FieldType.text },
    { icon: 'lock-2-line', title: i18n.t('entry.menu.password'), data: FieldType.password },
    { icon: 'image-2-line', title: i18n.t('entry.menu.image'), data: FieldType.image }
  ]
}

export interface Params {
  groupId: string
  entryId: string
  editable?: string
}

export interface Props {}

export default observer(function EntryDetailView (props: Props) {
  const { match, history, location } = useRouter<Params>()
  const { groupId, entryId } = match.params

  const t = useTranslate()
  const language = useLanguage()
  const confirm = useConfirm()
  const message = useMessage()
  const store = useAppStore()
  const editable = !!match.params.editable

  const [entry, setEntry] = useState<Entry>(() => toJS(store.entry))

  const menus = useMemo(getMenus, [language])

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
      title: t('confirm.title'),
      content: t('entry.remove-confirm'),
      onConfirm: () => {
        setEntry((e) => ({ ...e, fields: e.fields.filter((f) => f.id !== field.id) }))
      }
    })
  }, [])

  const onFieldCopy = useCallback((field: Field) => {
    if (field.value) {
      copy(field.value)
      message('check-line', t('entry.copy-tip'))
    }
  }, [])

  usePaste(
    async (e) => {
      if (editable && document.activeElement === document.body) {
        const data = await parseClipboardEvent(e)

        if (data) {
          const type = data.type === 'image' ? FieldType.image : FieldType.text

          setEntry((en) => ({
            ...en,
            fields: [...en.fields, createField(entry.id, type, data.content)]
          }))
        }
      }
    },
    [editable, entry]
  )

  usePrompt(editable, (l) => {
    if (location.pathname.startsWith(l.pathname)) return
    return t('entry.quit-confirm').toString()
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
