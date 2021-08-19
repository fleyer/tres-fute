import { h } from 'preact'

import { createSlice } from '@reduxjs/toolkit'

import { executeColorRule as gameExecuteColorRule, executeBonusRule } from './gameSlice'

const timelineSlice = createSlice({
    name: 'timelineState',
    initialState: {
        'step': {}
    },
    reducers: {

        executeRule: (state, action) => {
            const { rule, id, value } = action.payload

            gameExecuteColorRule(state.step, id, value)
        },

        reset: (state) => {
            state.step = {}
        }

    }
})
const executeChainedRule = ({ rule, id }) => {
    return (dispatch, getState) => {
        const [color, colorI, colorJ] = id.split('-')
        const state = getState().timeline
        const j = Number(colorJ)

        if (
            isFirst(state, j) ||
            previousIsChecked(state, j) && !nextIschecked(state, j)
        ) {
            dispatch(executeRule({ rule, id }))
            dispatch(executeBonusRule({ 
                rule: {id: rule.id,...getFooterBonus(rule)}, 
                id, 
                isActive: getState().timeline.step[id] 
            }))
        }
    }
}

function getFooterBonus({footer}){
    return footer.filter(elem => elem.hasOwnProperty('bonus'))
        .reduce((acc,elem) =>{
            return {...acc,...elem}
        },{})
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