import { h } from 'preact'

import { FaSync } from "react-icons/fa";
import { GiWolfHead } from "react-icons/gi";

import Box from '../box'

const Bonus = ({value,css}) => {
    const BoxCmp = getDisplay(value)

    return <BoxCmp css={css}></BoxCmp>
}

const getDisplay = (value) => {
    switch(value){
        case '+1': 
            return ({css}) => <Box css={`bg-black text-white ${css}`}>{value}</Box>
        break

        case 'replay': 
            return ({css}) => (<Box css={`bg-black text-white ${css}`}><FaSync size={15}/></Box>)
        break

        case 'wolf' :
            return ({css}) => (<div class={`relative text-red-500 text-3xl ${css}`}><GiWolfHead/></div>)
        break

        default:
            return ({css})=><div  class="relative text-black">{value}</div>
    }
}

export default Bonus