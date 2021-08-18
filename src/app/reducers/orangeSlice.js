import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

import { executeColorRule as gameExecuteColorRule, executeBonusRule } from './gameSlice'

const orangeSlice = createSlice({
    name: 'orangeState',
    initialState: {
        'step': {
            'orange-0-0-isDisabled': false
        }
    },
    reducers: {
        executeRule: (state, action) => {
            const { rule, id, value } = action.payload

            gameExecuteColorRule(state.step, id, value)
        },

        reset: (state) => {
            state.step = { 'orange-0-0-isDisabled': false }
        }
    },
})

const executeChainedRule = ({ rule, id, value }) => {
    return (dispatch, getState) => {
        const [color, colorI, colorJ] = id.split('-')

        dispatch(executeRule({ rule, id, value }))
        dispatch(executeRule({ rule: {}, id: `orange-0-${Number(colorJ) + 1}-isDisabled`, value: false }))
        dispatch(executeBonusRule({ rule, id, isActive: getState().orange.step[id] }))

        if (colorJ > 0 && value) {
            dispatch(executeRule({ rule: {}, id: `orange-0-${Number(colorJ) - 1}-isDisabled`, value: true }))
        }

    }
}

function nextIschecked(state, indice) {
    return state.step[`orange-0-${indice + 1}`]
}

function previousIsChecked(state, indice) {
    return state.step[`orange-0-${indice - 1}`]
}

function isFirst(state, indice) {

    return indice === 0 && !state.step[`orange-0-${indice + 1}`]
}

export const { executeRule, reset } = orangeSlice.actions
export { executeChainedRule }
export default orangeSlice.reducer