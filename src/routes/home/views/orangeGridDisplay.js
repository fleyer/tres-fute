import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'

import { executeChainedRule } from '../../../app/reducers/orangeSlice'

import Grid from '../../../components/grid'
import Clickable from '../components/clickable'

import { Css as OrangeCss, Rule as OrangeRule, Id as OrangeId } from '../../../game/orange'
import { Provider as OrangeProvider } from '../context'

import style from '../style.css'

const OrangeGridDisplay = () => {
    const dispatch = useDispatch()
    const orangeSelector = (id) => (state) => state.orange.step[id]
    const orangeDispatch = useCallback(() => { }, [])

    return <div class={`mt-4 pt-2 pb-1 rounded ${OrangeCss.bg} ${style.grid}`}>
        <OrangeProvider value={{ dispatch: orangeDispatch, selector: orangeSelector }}>
            <Grid
                item={getOrangCheckClickable}
                gridInfo={{ line: 1, column: 10, itemId: OrangeId }}
                rule={OrangeRule}
                css={OrangeCss}
            />
        </OrangeProvider>
    </div>
}

const getOrangCheckClickable = (props) => {
    const { content } = props.rule
    const [, colorI, colorJ] = props.id.split('-')
    const _props = { ...props, rule: { ...props.rule } }
    _props.rule.content = null
    const isDisabled = useSelector((state) => state.orange.step[`orange-0-${colorJ}-isDisabled`])
    const value = useSelector((state) => state.orange.step[`orange-0-${colorJ}`]) || ""
    const dispatch = useDispatch()

    const onChange = (e) => {
        const value = Number(e.data)
        dispatch(executeChainedRule({rule: props.rule,id: props.id,value}))
    }

    return <Clickable {..._props}>
        <input
            class={style.numberInput}
            placeholder={content}
            type="number"
            disabled={isDisabled === undefined ? true : isDisabled}
            value={value}
            onChange={onChange}
        ></input>
    </Clickable>

}

export default OrangeGridDisplay