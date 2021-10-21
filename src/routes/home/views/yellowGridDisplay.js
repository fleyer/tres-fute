import { h } from 'preact'
import { useCallback } from 'preact/hooks'

import { useDispatch, useSelector } from 'react-redux'
import { getDisabledId } from '../../../app/reducers/utils'

import { executeChainedRule } from '../../../app/reducers/yellowSlice'

import Grid from '../../../components/grid'

import { Css as YellowCss, Rule as YellowRule, Id as YellowId } from '../../../game/yellow'
import CheckClickable from '../components/checkClickable'


import style from '../style.css'

const YellowGridDisplay = () =>
    <div class={`mt-4 pt-2 pb-1 rounded ${YellowCss.bg} ${style.grid}`}>
        <Grid
            item={getYellowCheckClicable}
            gridInfo={{ line: 4, column: 4, itemId: YellowId }}
            rule={YellowRule}
        />
    </div>


const getYellowCheckClicable = (props) => {
    const dispatch = useDispatch()
    const { id } = props
    const checked = useSelector((state) => state.gameState.present.yellow.step[id])
    const onClick = useCallback((args) => dispatch(executeChainedRule(args)), [])


    return <CheckClickable
        {...props}
        checked={checked}
        disabled={getDisabled(checked)}
        onClick={onClick} />
}


const getDisabled = (checked) => typeof checked !== 'undefined'

export default YellowGridDisplay