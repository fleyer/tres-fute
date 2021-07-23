import {h} from 'preact'
import Box from '../box'

const Mark = ({value,colorVariation,css}) => {
    const [color,markValue] = value.split('-')

    return (<Box css={`${css} ${getCss(color,colorVariation)}`}>{getValue(markValue)}</Box>)
}

const getValue = (value) => {
    return value || 'X'
}

const getCss = (color,colorVariation=500) => {
   

    return `bg-${color}${colorVariation ? `-${colorVariation}` : ''}`
}

export default Mark