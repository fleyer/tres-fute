import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'
import { ActionCreators } from 'redux-undo'

import { reset as resetGreen } from './greenSlice'
import { reset as resetOrange } from './orangeSlice'
import { reset as resetPurple } from './purpleSlice'
import { reset as resetYellow } from './yellowSlice'
import { reset as resetBlue } from './blueSlice'
import { reset as resetTimeline } from './timelineSlice'

const gameSclice = createSlice({
    name: 'gameState',
    initialState: {
        '+1': {},
        'replay': {},
        'timeline': {}
    },
    reducers: {

        resetGame: (state) => {
            state['+1'] = {}
            state['replay'] = {}
        },

        useBonus: (state, action) => {
            const { id, rule} = action.payload
            const [bonusType,,colorId] = id.split('-') 
            const currentValue = state[bonusType][id]

            state[bonusType][id] = inc(currentValue)
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
        }
    }
})

const reset = () => {
    return (dispatch) => {
        dispatch(resetGame())
        dispatch(resetTimeline())
        dispatch(resetBlue())
        dispatch(resetYellow())
        dispatch(resetGreen())
        dispatch(resetOrange())
        dispatch(resetPurple())
        dispatch(ActionCreators.clearHistory())
    }
}

const executeBonusRule = ({ rule, id, isActive }) => {
    return (dispatch) => {
        if (!hasBonus(rule)) return

        else if (isActive) dispatch(addBonus({ rule, id }))
    }
}

const executeUseBonus = ({ rule, id }) => {
    return (dispatch, getState) => {

        dispatch(useBonus({ rule, id }))
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

function executeColorRule(state, id, value) {
    state[id] =  value !== undefined ? value : !state[id]

    return state[id]
}

function _executeBonusRule(state, bonusType, id, isEnable) {
    const [color, colorId] = splitId(id)

    switch (bonusType) {
        case '+1':
        case 'replay':
            const length = Object.keys(state[bonusType]).length
        
            const value = 1
            const indice = length
            const bonusKey = `${bonusType}-0-${indice}`

            state[bonusType][bonusKey] = value
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