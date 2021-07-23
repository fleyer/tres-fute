import { h } from 'preact'

import { getColor } from './index'

import style from './style.css'

const CircleElement = ({rule,color,border,children}) =>
    <div class={`relative flex w-full justify-center bg-white p-1 rounded-full ${border}`}>
        <span class={`font-bold ${getColor(color)} ${style.content}`}>{rule.content}</span>
        {children}
    </div>

export default CircleElement