import { h } from 'preact'

import Grid from '../../../components/grid'
import Bonus from '../../../components/base/bonus'

import CircleClickable from '../components/circleClickable'

import { Rule as PlusOneRule, Id as PlusOneId } from '../../../game/plusone'

import style from '../style.css'

const PlusOneBonusDisplay = () => <div class={`mt-4 rounded border-2 border-gray-50 bg-gray-400 ${style.grid}`}>
    <Grid
        item={CircleClickable}
        gridInfo={{ line: 1, column: 7, itemId: PlusOneId }}
        rule={PlusOneRule}
    />

    <div class={style.bonusHeader}><Bonus value={'+1'}></Bonus></div>
</div> 

export default PlusOneBonusDisplay