import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

import { executeColorRule as gameExecuteColorRule, executeBonusRule } from './gameSlice'

const purpleSlice = createSlice({
    name: 'purpleState',
    initialState: {
        'step': {
            'purple-0-0-isDisabled': false
        }
    },
    reducers: {
        executeRule: (state, action) => {
            const { rule, id, value } = action.payload

            gameExecuteColorRule(state.step, id, value)
        },

        reset: (state) => {
            state.step = { 'purple-0-0-isDisabled': false }
        }
    },
})

const executeChainedRule = ({ rule, id, value }) => {
    return (dispatch, getState) => {
        const [color, colorI, colorJ] = id.split('-')

        dispatch(executeRule({ rule, id, value }))
        dispatch(executeRule({ rule: {}, id: `purple-0-${Number(colorJ) + 1}-isDisabled`, value: false }))
        dispatch(executeBonusRule({ rule, id, isActive: getState().purple.step[id] }))

        if (colorJ > 0 && value) {
            dispatch(executeRule({ rule: {}, id: `purple-0-${Number(colorJ) - 1}-isDisabled`, value: true }))
        }

    }
}

function nextIschecked(state, indice) {
    return state.step[`purple-0-${indice + 1}`]
}

function previousIsChecked(state, indice) {
    return state.step[`purple-0-${indice - 1}`]
}

function isFirst(state, indice) {

    return indice === 0 && !state.step[`purple-0-${indice + 1}`]
}

export const { executeRule, reset } = purpleSlice.actions
export { executeChainedRule }
export default purpleSlice.reducer