import { createContext, h } from 'preact'

import {dispatch,selector,isDisabled} from './defaultContext'

export const Context = createContext({dispatch,selector,isDisabled})
export const { Provider } = Context