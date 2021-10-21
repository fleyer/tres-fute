import { h } from 'preact'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '../../../components/grid'
import Bonus from '../../../components/base/bonus'

import CircleClickable from '../components/circleClickable'

import { executeUseBonus } from '../../../app/reducers/gameSlice'

import { Rule as PlusOneRule, Id as PlusOneId } from '../../../game/plusone'

import style from '../style.css'

const PlusOneBonusDisplay = () => 
    <div class={`mt-4 rounded border-2 border-gray-50 bg-gray-400 ${style.grid}`}>
        <Grid
            item={getCircleClickable}
            gridInfo={{ line: 1, column: 7, itemId: PlusOneId }}
            rule={PlusOneRule}
        />
        <div class={style.bonusHeader}><Bonus value={'+1'}></Bonus></div>
    </div>


const getCircleClickable = (props) => {
    const dispatch = useDispatch()
    const { id } = props
    const counter = useSelector((state) => state.gameState.present.game['+1'][id])
    const disabled = counter !== 1
    
    const onClick = () => dispatch(executeUseBonus({ rule: props.rule, id }))
    
    return <CircleClickable {...props} disabled={disabled} counter={counter} onClick={onClick} />
}


export default PlusOneBonusDisplay