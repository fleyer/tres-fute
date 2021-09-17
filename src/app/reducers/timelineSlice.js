import { h } from 'preact'

import { createSlice } from '@reduxjs/toolkit'

import { executeColorRule as gameExecuteColorRule, executeBonusRule } from './gameSlice'

const timelineSlice = createSlice({
    name: 'timelineState',
    initialState: {
        'step': {
            'timeline-0-0-disabled': false
        }
    },
    reducers: {

        executeRule: (state, action) => {
            const { rule, id, value } = action.payload
            const [name, colorJ, colorI] = id.split('-')

            gameExecuteColorRule(state.step, id, value)
            gameExecuteColorRule(state.step, `${id}-disabled`, true)
            gameExecuteColorRule(state.step, `${name}-${colorJ}-${Number(colorI)+1}-disabled`, false)
        },

        reset: (state) => {
            state.step = {
                'timeline-0-0-disabled': false
            }
        }

    }
})
const executeChainedRule = ({ rule, id }) => {
    return (dispatch, getState) => {

        dispatch(executeRule({ rule, id }))
        dispatch(executeBonusRule({
            rule: { id: rule.id, ...getFooterBonus(rule) },
            id,
            isActive: getState().gameState.present.timeline.step[id]
        }))

    }
}

function getFooterBonus({ footer }) {
    return footer.filter(elem => elem.hasOwnProperty('bonus'))
        .reduce((acc, elem) => {
            return { ...acc, ...elem }
        }, {})
}

function nextIschecked(state, indice) {
    return state.step[`timeline-0-${indice + 1}`]
}

function previousIsChecked(state, indice) {
    return state.step[`timeline-0-${indice - 1}`]
}

function isFirst(state, indice) {

    return indice === 0 && !state.step[`timeline-0-${indice + 1}`]
}

export const { executeRule, reset } = timelineSlice.actions
export { executeChainedRule }
export default timelineSlice.reducer