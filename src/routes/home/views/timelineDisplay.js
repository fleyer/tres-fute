import { h } from 'preact'

import Grid from '../../../components/grid'

import { Rule as TimelineRule, Css as TimelineCss } from '../../../game/timeline'

import TimelineElement from '../components/timelineElement'

import style from '../style.css'

const TimelineDisplay = () =>
    <div class={style.gridTimeline}>
        <Grid
            item={TimelineElement}
            gridInfo={{ line: 1, column: 6 }}
            rule={TimelineRule}
            css={TimelineCss}
        />
    </div>

export default TimelineDisplay