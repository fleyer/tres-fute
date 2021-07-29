import { h } from 'preact'
import { createSlice } from '@reduxjs/toolkit'

const gameSclice = createSlice({
    name: 'gameState',
    initialState: {
        '+1': {},
        'replay': {},
        'green': {}
    },
    reducers: {

        decrement: (state, action) => {
            state[action.target] -= 1
        },
        updateBonus: (state, action) => {
            const { rule, id } = action.payload
            const [color,colorId] = splitId(id)
            const currentValue = state[color][colorId]
            const fn = currentValue > 1 ? dec : inc

            currentValue > 0 && (state[color][colorId] = fn(currentValue))
        },
        incrementReplay: (state) => {
            state.replay += 1

        },
        executeRule: (state, action) => {
            let result

            console.log(action)

            action.payload && (result = executeColorRule(state, action.payload.id))

            const { rule, id } = action.payload

            rule.bonus && excecuteBonusRule(state, rule.bonus, id, result)
            rule.mark && excecuteMarkRule(state, rule.mark, id, result)
        }
    },
})

function executeColorRule(state, id) {
    const [color, colorId] = splitId(id)

    state[color][colorId] = state[color][colorId] ? !state[color][colorId] : true

    return state[color][colorId]
}

function excecuteBonusRule(state, bonus, id, isEnable) {
    const [color,colorId] = splitId(id)

    switch (bonus) {
        case '+1':
        case 'replay':
            const length = state[bonus].length
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

function excecuteMarkRule(state, mark) {

}

function splitId(id){
    return id.split('-')
}

function inc(value) {
    return value + 1
}

function dec(value){
    return value - 1
}

export const { updateBonus, incrementReplay, decrement, executeRule } = gameSclice.actions

export default gameSclice.reducer