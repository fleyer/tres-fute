import { createContext, h } from 'preact'

import {dispatch,selector} from './defaultContext'

export const Context = createContext({dispatch,selector})
export const { Provider } = Context