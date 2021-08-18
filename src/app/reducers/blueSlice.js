import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

import { executeBonusRule, executeColorRule as gameExecuteColorRule, splitId } from './gameSlice'
import { Rule as BlueRule } from '../../game/blue'

const VERTICAL_INCREMENT = 4
const HORIZONTAL_INCREMENT = 1

const blueSlice = createSlice({
    name: 'blueState',
    initialState: {
        'step': { 'blue-0-0': true }
    },
    reducers: {
        executeRule: (state, action) => {
            const { rule, id } = action.payload

            gameExecuteColorRule(state.step, id)
        },

        reset: (state) => {
            state.step = { 'blue-0-0': true }
        }
    },
})

const executeChainedRule = ({ rule, id }) => {
    return (dispatch, getState) => {
        const [, colorI, colorJ] = splitId(id)

        dispatch(executeRule({ rule, id }))

        const newState = getState().blue
        const isActive = newState.step[id]

        //vertical check
        let vBonusIndiceIfNeeded = isBonusNeedUpdate(
            newState,
            { i: 0, j: Number(colorJ) },
            ({ i, j }) => (i < 3),
            ({ i, j }) => ({ i: ++i, j })
        )

        //horizontal check
        let hBonusIndiceIfNeeded = isBonusNeedUpdate(
            newState,
            { i: Number(colorI), j: 0 },
            ({ i, j }) => j < 4,
            ({ i, j }) => ({ i, j: ++j })
        )

        if (vBonusIndiceIfNeeded) {
            dispatch(executeBonusRule({ rule: getBonusFromRule(vBonusIndiceIfNeeded), id, isActive }))
        }

        if (hBonusIndiceIfNeeded) {
            dispatch(executeBonusRule({ rule: getBonusFromRule(hBonusIndiceIfNeeded), id, isActive }))
        }

    }
}

function isBonusNeedUpdate(state, init, conditionFn, incrFn) {
    let result = true
    let incr = { ...init }

    while (conditionFn(incr) && (result = result && state.step[`blue-${incr.i}-${incr.j}`])) {
        incr = incrFn(incr)
    }

    return result ? incr : null
}

const getBonusFromRule = ({ i, j }) => {

    return BlueRule[i][j]
}

export const { executeRule, reset } = blueSlice.actions
export { executeChainedRule }
export default blueSlice.reducer