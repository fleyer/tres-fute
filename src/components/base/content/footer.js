import { h } from 'preact'
import { getInnerElement } from '../clickable'

import style from './style.css'

const Footer = ({children,elements}) => {
    return (<div class={`flex ${style.footer}`}>
        {getElements(elements)}
        {children}
    </div>)
}

const getElements = (elements=[]) => {
    return elements.map((element)=> getInnerElement(element,'text-white','',[],null))
}

export default Footer