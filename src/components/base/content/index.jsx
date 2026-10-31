import { h } from 'preact'

import style from './style.module.css'

const Content = ({children}) => {
    return (
        <div class={style.content}>
            {children}
        </div>
    )
}

export default Content