import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

import { executeColorRule as gameExecuteColorRule, executeBonusRule } from './gameSlice'

const greenSlice = createSlice({
    name: 'greenState',
    initialState: {
        'step': {}
    },
    reducers: {
        executeRule: (state, action) => {
            const { rule, id } = action.payload

            gameExecuteColorRule(state.step, id)
        }
    },
})

const executeChainedRule = ({ rule, id }) => {
    return (dispatch, getState) => {
        const [color, colorI, colorJ] = id.split('-')
        const state = getState().green
        const j = Number(colorJ)

        if (
            isFirst(state,j) ||
            previousIsChecked(state, j) && !nextIschecked(state, j)
        ) {
            dispatch(executeRule({ rule, id }))

            dispatch(executeBonusRule({ rule, id, isActive: getState().green.step[id] }))
        }
    }
}

function nextIschecked(state, indice) {
    return state.step[`green-0-${indice + 1}`]
}

function previousIsChecked(state, indice) {
    return state.step[`green-0-${indice - 1}`]
}

function isFirst(state, indice) {

    return indice === 0 && !state.step[`green-0-${indice + 1}`]
}

export const { executeRule } = greenSlice.actions
export { executeChainedRule }
export default greenSlice.reducer