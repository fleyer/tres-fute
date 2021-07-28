import { h } from 'preact'

import Grid from '../../../components/grid'

import { Css as GreenCss, Rule as GreenRule, Id as GreenId } from '../../../game/green'
import CheckClickable from '../components/checkClickable'

import style from '../style.css'

const GreenGridDisplay = () =>
    <div class={`mt-4 pt-2 pb-1 rounded ${GreenCss.bg} ${style.grid}`}>
        <Grid
            item={CheckClickable}
            gridInfo={{ line: 1, column: 10, itemId: GreenId }}
            rule={GreenRule}
            css={GreenCss}
        />
    </div>

export default GreenGridDisplay