import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

import { executeColorRule as gameExecuteColorRule, executeBonusRule } from './gameSlice'
import { getId as _getId, getDisabledId as _getDisabledId, getErrorId as _getErrorId } from './utils'
import { Id } from '../../game/purple'

const COLOR = Id

const getId = _getId(COLOR)
const getErrorId = _getErrorId(COLOR)
const getDisabledId = _getDisabledId(COLOR)

const purpleSlice = createSlice({
    name: 'purpleState',
    initialState: {
        'step': {
            'purple-0-0-disabled': false
        }
    },
    reducers: {
        executeRule: (state, action) => {
            const { id, value } = action.payload
            const [, , colorJ] = id.split('-')
            const index = Number(colorJ)
            const previousValue = state.step[getId(index - 1)]
            const nextShouldBeDisabled = index !== 0 && value <= previousValue && previousValue !== 6

            gameExecuteColorRule(state.step, id, value)
            gameExecuteColorRule(state.step, getDisabledId(index + 1), nextShouldBeDisabled)
            gameExecuteColorRule(state.step, getErrorId(index), nextShouldBeDisabled ? "error" : null)

            if (colorJ > 0 && typeof value === 'number')
                gameExecuteColorRule(state.step, getDisabledId(index - 1), true)

        },

        reset: (state) => {
            state.step = { [getDisabledId(0)]: false }
        }
    },
})

const executeChainedRule = ({ rule, id, value }) => {
    return (dispatch, getState) => {

        dispatch(executeRule({ rule, id, value }))
        dispatch(executeBonusRule({ rule, id, isActive: getState().gameState.present.purple.step[id] }))
    }
}

export const { executeRule, reset } = purpleSlice.actions
export { executeChainedRule }
export default purpleSlice.reducer