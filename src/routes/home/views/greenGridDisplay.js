import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'

import { executeChainedRule } from '../../../app/reducers/greenSlice'

import Grid from '../../../components/grid'

import { Css as GreenCss, Rule as GreenRule, Id as GreenId } from '../../../game/green'
import CheckClickable from '../components/checkClickable'

import style from '../style.css'

const GreenGridDisplay = () => {

    return <div class={`mt-4 pt-2 pb-1 rounded ${GreenCss.bg} ${style.grid}`}>
        <Grid
            item={getGreenCheckClicable}
            gridInfo={{ line: 1, column: 10, itemId: GreenId }}
            rule={GreenRule}
            css={GreenCss}
        />
    </div>
}

const getGreenCheckClicable = (props) => {
    const dispatch = useDispatch()
    const { id } = props
    const checked = useSelector((state) => state.gameState.present.green.step[id])
    const disabled = useSelector((state) => state.gameState.present.green.step[`${id}-disabled`])
    const onClick = useCallback((args) => dispatch(executeChainedRule(args)), [])

    return <CheckClickable 
        {...props}
        checked={checked}
        disabled={disabled} 
        onClick={onClick}/>
}



export default GreenGridDisplay