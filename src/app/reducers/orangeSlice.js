import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

import { executeColorRule as gameExecuteColorRule, executeBonusRule } from './gameSlice'

const orangeSlice = createSlice({
    name: 'orangeState',
    initialState: {
        'step': {
            'orange-0-0-disabled': false
        }
    },
    reducers: {
        executeRule: (state, action) => {
            const { rule, id, value } = action.payload
            const [, , colorJ] = id.split('-')


            gameExecuteColorRule(state.step, id, value)
            gameExecuteColorRule(state.step,getDisabledId(Number(colorJ) +1),false)

            if(colorJ > 0)
                gameExecuteColorRule(state.step,getDisabledId(Number(colorJ) - 1),true)

        },

        reset: (state) => {
            state.step = { 'orange-0-0-disabled': false }
        }
    },
})

const getId = (index) => `orange-0-${index}`
const getDisabledId = (id) => `${getId(id)}-disabled`

const executeChainedRule = ({ rule, id, value }) => {
    return (dispatch, getState) => {

        dispatch(executeRule({ rule, id, value }))
        dispatch(executeBonusRule({ rule, id, isActive: getState().gameState.present.orange.step[id] }))
    }
}

export const { executeRule, reset } = orangeSlice.actions
export { executeChainedRule }
export default orangeSlice.reducer