import { h } from 'preact'

import { useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { GoChevronLeft } from 'react-icons/go'

import { executeChainedRule } from '../../../app/reducers/purpleSlice'

import Grid from '../../../components/grid'
import Clickable from '../components/clickable'

import { Provider as PurpleProvider } from '../context'

import { Rule as PurpleRule, Id as PurpleId, Css as PurpleCss } from '../../../game/purple'

import style from '../style.css'

const PurpleGridDisplay = () => {
    const purpleSelector = (id) => (state) => state.purple.step[id]
    const purpleDispatch = useCallback(() => { }, [])

    return <div class={`mt-4 pt-2 pb-1 rounded ${PurpleCss.bg} ${style.grid}`}>
        <PurpleProvider value={{ dispatch: purpleDispatch, selector: purpleSelector }}>
            <Grid
                item={getPurpleClickable}
                gridInfo={{ line: 1, column: 10, itemId: PurpleId }}
                rule={PurpleRule}
                css={PurpleCss}
            />
        </PurpleProvider>
    </div>
}

const PurpleDividerCmp = () => <div class={style.purpleDivider}>
    <GoChevronLeft></GoChevronLeft>
</div>

const getPurpleClickable = (props) => {
    const PurpleClickable = Clickable
    const dispatch = useDispatch()
    const [, colorI, colorJ] = props.id.split('-')
    const isDisabled = useSelector((state) => state.purple.step[`purple-0-${colorJ}-isDisabled`])
    const value = useSelector((state)=> state.purple.step[`purple-0-${colorJ}`])

    const onChange = (e) => {
        const value = Number(e.data)
        dispatch(executeChainedRule({rule: props.rule,id: props.id,value}))
    }

    return <PurpleClickable {...props}>
        <input 
            class={style.numberInput} 
            disabled={isDisabled === undefined ? true : isDisabled}
            onChange={onChange}
            value={value}
            type="number">
        </input>
        {/* {props.number < PurpleRule[0].length - 1 && <PurpleDividerCmp />} */}
    </PurpleClickable>
}

export default PurpleGridDisplay