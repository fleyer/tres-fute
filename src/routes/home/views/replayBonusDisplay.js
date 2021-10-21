import { h } from 'preact'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

import Grid from '../../../components/grid'
import Bonus from '../../../components/base/bonus'

import CircleClickable from '../components/circleClickable'
import { Provider as ReplayProvider } from '../context'

import { Rule as ReplayRule, Id as ReplayId } from '../../../game/replay'

import style from '../style.css'
import { executeUseBonus } from '../../../app/reducers/gameSlice'

const ReplayBonusDisplay = () => {

    return <div class={`mt-4 rounded border-2 border-gray-50 bg-gray-400 ${style.grid}`}>
        <Grid
            item={getCircleClickable}
            gridInfo={{ line: 1, column: 7, itemId: ReplayId }}
            rule={ReplayRule}
        />
        <div class={style.bonusHeader}><Bonus value={'replay'}></Bonus></div>
    </div>
}

const getCircleClickable = (props) => {
    const dispatch = useDispatch()
    const { id } = props
    const counter = useSelector((state) => state.gameState.present.game.replay[id])
    const disabled = counter !== 1

    const onClick = () => dispatch(executeUseBonus({rule: props.rule, id}))

    return <CircleClickable {...props} disabled={disabled} counter={counter} onClick={onClick}/>
}



export default ReplayBonusDisplay