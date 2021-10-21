import { h } from 'preact'
import { useDispatch, useSelector } from 'react-redux'

import { executeChainedRule } from '../../../app/reducers/timelineSlice'

import Grid from '../../../components/grid'

import { Rule as TimelineRule, Css as TimelineCss, Id as TimelineId } from '../../../game/timeline'

import TimelineElement from '../components/timelineElement'

import style from '../style.css'

const TimelineDisplay = () => 
    <div class={style.gridTimeline}>
        <Grid
            item={getTimelineElement}
            gridInfo={{ line: 1, column: 6, itemId: TimelineId }}
            rule={TimelineRule}
            css={TimelineCss}
        />
    </div>

const getTimelineElement = (props) => {
    const dispatch = useDispatch()
    const onClick = (args) => dispatch(executeChainedRule(args))
    const disabled = useSelector((state) => state.gameState.present.timeline.step[`${props.id}-disabled`])
    const checked = useSelector((state) => state.gameState.present.timeline.step[props.id])

    return <TimelineElement {...props} checked={checked} onClick={onClick} disabled={disabled}></TimelineElement>
}

export default TimelineDisplay