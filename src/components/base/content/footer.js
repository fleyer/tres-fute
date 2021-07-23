import { h } from 'preact'
import { getInnerElement } from '../clickable'

import style from './style.css'

const Footer = ({children,elements}) => {
    return (<div class={`relative flex ${style.footer}`}>
        {getElements(elements)}
        {children}
    </div>)
}

const getElements = (elements=[]) => {
    return <div class="absolute w-full h-full flex justify-center">
        {elements.map((element)=> getInnerElement(element,'text-white','',[],null))}
    </div>
}

export default Footer