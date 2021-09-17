import { h } from 'preact'

import { useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { GoChevronLeft } from 'react-icons/go'

import { executeChainedRule } from '../../../app/reducers/purpleSlice'

import Grid from '../../../components/grid'
import Clickable from '../components/clickable'

// import { Provider as PurpleProvider } from '../context'

import { Rule as PurpleRule, Id as PurpleId, Css as PurpleCss } from '../../../game/purple'

import style from '../style.css'

const PurpleGridDisplay = () => {

    return <div class={`mt-4 pt-2 pb-1 rounded ${PurpleCss.bg} ${style.grid}`}>
        <Grid
            item={getPurpleClickable}
            gridInfo={{ line: 1, column: 10, itemId: PurpleId }}
            rule={PurpleRule}
            css={PurpleCss}
        />
    </div>
}

const PurpleDividerCmp = () => <div class={style.purpleDivider}>
    <GoChevronLeft></GoChevronLeft>
</div>

const getPurpleClickable = (props) => {
    const dispatch = useDispatch()
    const purpleSelector = (state) => state.gameState.present.purple.step[props.id]
    const purpleDispatch = (rule, id, value) => { dispatch(executeChainedRule({ rule, id, value })) }
    const isDisabled = useSelector((state) => state.gameState.present.purple.step[`${props.id}-disabled`])
    const error = useSelector((state) => state.gameState.present.purple.step[`${props.id}-error`])

    const value = useSelector(purpleSelector) || ""

    return <div class="flex">
        <Clickable {...props} error={error}>
            <input
                class={style.numberInput}
                disabled={isDisabled === undefined ? true : isDisabled}
                onChange={onChange(props, purpleDispatch)}
                value={value}
                type="number">
            </input>
            <PurpleDividerCmp />
            
        </Clickable>
        {/* {props.number < PurpleRule[0].length - 1 && <PurpleDividerCmp />} */}
    </div>

}

const onChange = ({ rule, id }, dispatch) => {
    return (e) => {
        dispatch(rule, id, Number(e.data))
    }
}

export default PurpleGridDisplay