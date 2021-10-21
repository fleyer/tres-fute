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

    return <div class={`mt-4 pt-2 pb-1 rounded ${OrangeCss.bg} ${style.grid}`}>
            <Grid
                item={getOrangCheckClickable}
                gridInfo={{ line: 1, column: 10, itemId: OrangeId }}
                rule={OrangeRule}
                css={OrangeCss}
            />
    </div>
}

const getOrangCheckClickable = (props) => {
    const { content } = props.rule
    const [, , colorJ] = props.id.split('-')
    const { id } = props
    const _props = { ...props, rule: { ...props.rule } }
    _props.rule.content = null
    const isDisabled = useSelector((state) => state.gameState.present.orange.step[`orange-0-${colorJ}-disabled`])
    const value = useSelector((state) => state.gameState.present.orange.step[id]) || ""
    const dispatch = useDispatch()

    return <Clickable {..._props}>
        <input
            class={style.numberInput}
            placeholder={content}
            type="number"
            disabled={isDisabled === undefined ? true : isDisabled}
            value={value}
            onChange={onChange(props,dispatch)}
        ></input>
    </Clickable>

}

const onChange = ({rule,id},dispatch) => { 

    return (e) => {
        const value = Number(e.data)
        dispatch(executeChainedRule({rule,id,value}))
    }
}

export default OrangeGridDisplay