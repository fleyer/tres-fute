import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import { useDispatch } from 'react-redux'

import { executeChainedRule } from '../../../app/reducers/timelineSlice'

import Grid from '../../../components/grid'

import { Rule as TimelineRule, Css as TimelineCss, Id as TimelineId } from '../../../game/timeline'

import TimelineElement from '../components/timelineElement'
import { Provider as TimelineProvider } from '../context'

import style from '../style.css'

const TimelineDisplay = () => {
    const dispatch = useDispatch()
    const timelineSelector = (id) => (state) => state.timeline.step[id]
    const timelineDispatch = useCallback((args) => dispatch(executeChainedRule(args)), [])

    return <div class={style.gridTimeline}>
        <TimelineProvider value={{
            selector: timelineSelector,
            dispatch: timelineDispatch
        }}>
            <Grid
                item={TimelineElement}
                gridInfo={{ line: 1, column: 6, itemId: TimelineId }}
                rule={TimelineRule}
                css={TimelineCss}
            />
        </TimelineProvider>

    </div>

}

export default TimelineDisplay