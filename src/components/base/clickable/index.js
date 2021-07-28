import { h, Fragment } from 'preact'
import { useCallback } from 'preact/hooks'

import SquareElement from './square'

import Bonus from "../bonus"
import Indicator from "../indicator"
import Mark from "../mark"

import style from './style.css'

const Clickable = (props) => {
    const { number, value, rule = {} , color, border,children,onClick=()=>{}} = props
    const { displayElement } = props

    const _onClick = useCallback(() => { 
        onClick(rule)
    },[])

    const InnerElement = _getInnerElement

    return (
        <div class={`flex flex-col items-center relative select-none ${style.clickable}`} onClick={_onClick}>
            <InnerElement rule={rule} color={color} border={border} displayElement={displayElement}>
                {children}
            </InnerElement>

        </div>
        
    )
}

const getColor = (color) => color ? `text-${color}` : ''

const getInnerElement = (rule, color, border,children,displayElement) => {
    const InnerElement = _getInnerElement
    
    return  <InnerElement rule={rule} color={color} border={border} displayElement={displayElement}>
        {children}
    </InnerElement>
}

const _getInnerElement = ({rule, color, border,children,displayElement}) => {
    const DisplayElement = displayElement || SquareElement

    return <Fragment>
        { rule.indicator && <Indicator value={rule.indicator}/>}

        { !rule.hasOwnProperty('tail') && <DisplayElement color={color} border={border} rule={rule}>
            {children}
            </DisplayElement>
        }

        { rule.bonus && <Bonus value={rule.bonus} css={`${style.boxContainer} ${!rule.tail ? '-mt-2' : ''}`}/>}
        { rule.mark && <Mark value={rule.mark} css={`${style.boxContainer} ${!rule.tail ? '-mt-2' : ''}`} colorVariation={rule.colorVariation}/>}
    </Fragment>
}


export { getInnerElement, getColor }
export default Clickable 