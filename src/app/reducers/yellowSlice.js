import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

import { executeBonusRule, executeColorRule as gameExecuteColorRule, splitId } from './gameSlice'
import { Rule as YellowRule } from '../../game/yellow'

const yellowSlice = createSlice({
    name: 'yellowState',
    initialState: {
        'step': {}
    },
    reducers: {
        executeRule: (state, action) => {
            const { rule, id } = action.payload

            gameExecuteColorRule(state.step, id)
        },

        reset: (state) => {
            state.step = {
                'yellow-0-3': true,
                'yellow-1-2': true,
                'yellow-2-1': true,
                'yellow-3-0': true,
            }
        }
    },
})

const executeChainedRule = ({ rule, id }) => {
    return (dispatch, getState) => {
        const [, colorI, colorJ] = splitId(id)

        dispatch(executeRule({ rule, id }))

        dispatch(executeBonusRule({ rule, id, isActive: getState().gameState.present.yellow.step[id] }))

        // //horizontal check
        let hBonusIndiceIfNeeded = isBonusNeedUpdate(
            getState().gameState.present.yellow,
            { i: Number(colorI), j: 0 },
            ({ i, j }) => j < 4,
            ({ i, j }) => ({ i, j: ++j })
        )

        if (hBonusIndiceIfNeeded) {
            dispatch(executeBonusRule({ rule: getBonusFromRule(hBonusIndiceIfNeeded), id, isActive: true }))
        }

        //diagonal check
        let dBonusIndiceIfNeeded

        if (colorI === colorJ && (dBonusIndiceIfNeeded = isBonusNeedUpdate(
            getState().gameState.present.yellow,
            { i: 0, j: 0 },
            ({ i, j }) => j < 4,
            ({ i, j }) => ({ i: ++i, j: ++j })
        ))) {

            dispatch(executeBonusRule({ rule: getBonusFromRule(dBonusIndiceIfNeeded), id, isActive: true }))
        }

    }
}

function isBonusNeedUpdate(state, init, conditionFn, incrFn) {
    let result = true
    let incr = { ...init }

    while (conditionFn(incr) && (result = result && state.step[`yellow-${incr.i}-${incr.j}`])) {
        incr = incrFn(incr)
    }

    return result ? incr : null
}

const getBonusFromRule = ({ i, j }) => YellowRule[i][j]

export const { executeRule, reset } = yellowSlice.actions
export { executeChainedRule }
export default yellowSlice.reducer