import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

import { reset as resetGreen } from './greenSlice'
import { reset as resetOrange } from './orangeSlice'
import { reset as resetPurple } from './purpleSlice'
import { reset as resetBlue } from './blueSlice'
import { reset as resetTimeline } from './timelineSlice'

const gameSclice = createSlice({
    name: 'gameState',
    initialState: {
        '+1': {},
        'replay': {},
    },
    reducers: {

        resetGame: (state) => {
            state['+1'] = {}
            state['replay'] = {}
        },

        useBonus: (state, action) => {
            const { id } = action.payload
            const [color, colorId] = splitId(id)
            const currentValue = state[color][colorId]
            const fn = inc

            state[color][colorId] = fn(currentValue)
        },

        addBonus: (state, action) => {
            console.log('add bonus')
            const { rule, id } = action.payload

            _executeBonusRule(state, rule.bonus, id, true)
        },

        removeBonus: (state, action) => {
            console.log('remove bonus')

            const { rule, id } = action.payload

            _executeBonusRule(state, rule.bonus, id, false)
        },

        // executeColorRule: (state,action) => {
        //     const {id,value} = action.payload

        //     executeColorRule(state.step,id,value)
        // }
    }
})

const reset = () => {
    return (dispatch) => {
        dispatch(resetGame())
        dispatch(resetTimeline())
        dispatch(resetBlue())
        dispatch(resetGreen())
        dispatch(resetOrange())
        dispatch(resetPurple())
    }
}

const executeBonusRule = ({ rule, id, isActive }) => {
    return (dispatch) => {
        if (!hasBonus(rule)) return

        else if (isActive) dispatch(addBonus({ rule, id }))
        else dispatch(removeBonus({ rule, id }))
    }
}

const executeUseBonus = ({ rule, id }) => {
    return (dispatch, getState) => {
        const [color, colorId] = splitId(id)
        const isActive = getState().game[color][colorId] === 1

        if (isActive) dispatch(useBonus({ rule, id }))
    }
}

function hasBonus(rule) {
    return rule.bonus || rule.mark
}

function _executeColorRule(state, id) {
    const [color, colorId] = splitId(id)

    state[color][colorId] = state[color][colorId] ? !state[color][colorId] : true

    return state[color][colorId]
}

function executeColorRule(state, id, value = true) {
    state[id] = state[id] ? !state[id] : value

    return state[id]
}

function _executeBonusRule(state, bonus, id, isEnable) {
    const [color, colorId] = splitId(id)

    switch (bonus) {
        case '+1':
        case 'replay':
            const length = Object.keys(state[bonus]).length
            const currentIndice = length - 1 > 0 ? length - 1 : 0
            const currentValue = state[bonus][currentIndice] || 0
            const value = isEnable ? 1 : 0
            const indice = isEnable && currentValue > 0 ? length : currentIndice

            state[bonus][indice] = value
            break

        default:
            console.log('no bonus rule to execute')
    }
}

function splitId(id) {
    return id.split('-')
}

function inc(value) {
    return value + 1
}

function dec(value) {
    return value - 1
}

export const { addBonus, useBonus, removeBonus, resetGame } = gameSclice.actions
export { executeColorRule, executeBonusRule, executeUseBonus, reset, splitId }
export default gameSclice.reducer