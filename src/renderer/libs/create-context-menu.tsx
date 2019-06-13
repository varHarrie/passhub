import {
  createContext,
  cloneElement,
  ReactNode,
  isValidElement,
  useCallback,
  useState,
  useContext,
  useRef,
  useEffect
} from 'react'
import { IconType } from '../models/base'
import styled from 'styled-components'
import Menu from '../components/Menu'
import { css } from '../styles'
import { noop } from './utils'

export type MenuContextValue<P> = {
  (e: React.MouseEvent, payload: P): void
}

export type MenuOption<O> = {
  icon: IconType
  title: string
  data: O
}

export interface WrapperProps<P, O> {
  options: MenuOption<O>[]
  children: ReactNode
  onClick?: (e: React.MouseEvent, data: O, payload: P) => void
}

export interface TriggerProps<T> {
  payload: T
  children: ReactNode
}

export default function createContextMenu<P, O> () {
  const MenuContext = createContext<MenuContextValue<P>>(null)

  function Wrapper (props: WrapperProps<P, O>) {
    const { options, children, onClick = noop } = props

    const [visible, setVisible] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })

    const refPayload = useRef<P>()

    const onShow = useCallback((e: React.MouseEvent, p: P) => {
      const nextPosition = { top: e.clientY, left: e.clientX }
      setVisible(false)

      setTimeout(() => {
        refPayload.current = p
        setVisible(true)
        setPosition(nextPosition)
      }, 0)
    }, [])

    const onHide = useCallback(() => {
      setVisible(false)
    }, [])

    const onItemClick = useCallback(
      (e, data) => {
        onClick(e, data, refPayload.current)
      },
      [onClick]
    )

    useEffect(() => {
      document.addEventListener('click', onHide)
      return () => {
        document.removeEventListener('click', onHide)
      }
    }, [])

    return (
      <MenuContext.Provider value={onShow}>
        {children}
        <ContextMenu visible={visible} style={position}>
          {options.map((item) => (
            <Menu.Item key={item.title} {...item} onClick={onItemClick} />
          ))}
        </ContextMenu>
      </MenuContext.Provider>
    )
  }

  function Trigger (props: TriggerProps<P>) {
    const { payload, children } = props
    const onShow = useContext(MenuContext)

    const onContextMenu = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        onShow(e, payload)
      },
      [payload, onShow]
    )

    return isValidElement(children)
      ? cloneElement(children, { onContextMenu })
      : (children as React.ReactElement)
  }

  return { Wrapper, Trigger }
}

const ContextMenu = styled(Menu)<{ visible: boolean }>`
  position: fixed;
  z-index: 2;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;

  ${(p) =>
    p.visible &&
    css`
      opacity: 1;
      transform: scaleY(1);
      transition: opacity 0.2s, transform 0.2s;
    `}
`
