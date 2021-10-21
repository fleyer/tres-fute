import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

import { executeColorRule as gameExecuteColorRule, executeBonusRule } from './gameSlice'

const greenSlice = createSlice({
    name: 'greenState',
    initialState: {
        'step': {
            'green-0-0-disabled': false
        }
    },
    reducers: {
        executeRule: (state, action) => {
            const { rule, id, value } = action.payload
            const [, , colorJ] = id.split('-')

            gameExecuteColorRule(state.step, id,value)
            gameExecuteColorRule(state.step,getDisabledId(Number(colorJ)),true)
            gameExecuteColorRule(state.step,getDisabledId(Number(colorJ) + 1),false)
        },

        reset: (state) => {
            state.step = { 'green-0-0-disabled': false }
        }
    }
})

const getId = (index) => `green-0-${index}`
const getDisabledId = (id) => `${getId(id)}-disabled`

const executeChainedRule = ({ rule, id }) => {
    return (dispatch, getState) => {
        
        dispatch(executeRule({ rule, id }))
        dispatch(executeBonusRule({ rule, id, isActive: getState().gameState.present.green.step[id] }))
    }
}

export const { executeRule, reset } = greenSlice.actions
export { executeChainedRule }
export default greenSlice.reducer