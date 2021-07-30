import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

import { executeColorRule as gameExecuteColorRule, splitId } from './gameSlice'

const VERTICAL_INCREMENT = 4
const HORIZONTAL_INCREMENT = 1

const blueSlice = createSlice({
    name: 'blueState',
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
        const [, colorI, colorJ] = splitId(id)

        if (rule.tail) return

        if (!rule.tail) dispatch(executeRule({ rule, id }))

        const newState = getState().blue

        if (isBonusNeedUpdate(
            newState,
            { i: 0, j: Number(colorJ) },
            ({ i, j }) => (i * VERTICAL_INCREMENT + j) < 13,
            ({ i, j }) => ({ i: ++i, j })
        )) {
            console.log('bonus need Update')
        }

        if (isBonusNeedUpdate(
            newState,
            { i: Number(colorI), j: 0 },
            ({i, j}) => j  < 4,
            ({i,j}) => ({ i,j: ++j})
        )) {
            console.log('bonus need Update')
        }

    }
}

function isBonusNeedUpdate(state, init, conditionFn, incrFn) {
    let result = true
    let incr = { ...init }

    while (conditionFn(incr) && (result = result && state.step[`blue-${incr.i}-${incr.j}`])) {
        incr = incrFn(incr)
    }

    return result ? incrFn(incr) : null
}

// function getInitial(numberI, numberJ) {
//     let result = numberJ;

//     while (result > INCREMENT) {
//         result -= INCREMENT
//     }

//     return result
// }

export const { executeRule } = blueSlice.actions
export { executeChainedRule }
export default blueSlice.reducer