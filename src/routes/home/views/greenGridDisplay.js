import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'

import { executeChainedRule } from '../../../app/reducers/greenSlice'

import Grid from '../../../components/grid'

import { Css as GreenCss, Rule as GreenRule, Id as GreenId } from '../../../game/green'
import CheckClickable from '../components/checkClickable'
import { Provider as GreenProvider } from '../context'

import style from '../style.css'

const GreenGridDisplay = () => {
    const dispatch = useDispatch()
    const greenSelector = (id) => (state) => state.green.step[id]
    const greenDispatch = useCallback((args) => dispatch(executeChainedRule(args)), [])

    return <div class={`mt-4 pt-2 pb-1 rounded ${GreenCss.bg} ${style.grid}`}>
        <GreenProvider value={{ dispatch: greenDispatch , selector: greenSelector }}>
            <Grid
                item={CheckClickable}
                gridInfo={{ line: 1, column: 10, itemId: GreenId }}
                rule={GreenRule}
                css={GreenCss}
            />
        </GreenProvider>
    </div>
}


export default GreenGridDisplay