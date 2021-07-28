import { h } from 'preact'

import Grid from '../../../components/grid'
import Bonus from '../../../components/base/bonus'

import CircleClickable from '../components/circleClickable'

import { Rule as ReplayRule, Id as ReplayId } from '../../../game/replay'

import style from '../style.css'

const ReplayBonusDisplay = () =>
    <div class={`mt-4 rounded border-2 border-gray-50 bg-gray-400 ${style.grid}`}>
        <Grid
            item={CircleClickable}
            gridInfo={{ line: 1, column: 7, itemId: ReplayId}}
            rule={ReplayRule}
        />

        <div class={style.bonusHeader}><Bonus value={'replay'}></Bonus></div>
    </div>


export default ReplayBonusDisplay