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
        addBonus: (state, action) => {
            console.log('add bonus')
            const { rule, id } = action.payload

            rule.bonus && _executeBonusRule(state, rule.bonus, id, true)
        },

        removeBonus: (state, action) => {
            console.log('remove bonus')

            const { rule, id } = action.payload

            rule.bonus && _executeBonusRule(state, rule.bonus, id, false)
        },

        updateBonus: (state, action) => {
            // const { rule, id } = action.payload
            // const [color, colorId] = splitId(id)
            // const currentValue = state[color][colorId]
            // const fn = currentValue > 1 ? dec : inc

            // currentValue > 0 && (state[color][colorId] = fn(currentValue))
        },
        executeRule: (state, action) => {
            // let result

            // console.log(action)

            // action.payload && (result = _executeColorRule(state, action.payload.id))

            // const { rule, id } = action.payload

            // rule.bonus && excecuteBonusRule(state, rule.bonus, id, result)
            // rule.mark && excecuteMarkRule(state, rule.mark, id, result)
        }
    },
})
const executeBonusRule = ({ rule, id, isActive }) => {
    return (dispatch) => {
        if (!hasBonus(rule)) return

        else if (isActive) dispatch(addBonus({ rule, id }))
        else dispatch(removeBonus({ rule, id }))
    }
}

function hasBonus(rule){
    return rule.bonus || rule.mark
}

function _executeColorRule(state, id) {
    const [color, colorId] = splitId(id)

    state[color][colorId] = state[color][colorId] ? !state[color][colorId] : true

    return state[color][colorId]
}

function executeColorRule(state, id) {
    state[id] = state[id] ? !state[id] : true

    return state[id]
}

function _executeBonusRule(state, bonus, id, isEnable) {
    const [color, colorId] = splitId(id)

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

function splitId(id) {
    return id.split('-')
}

function inc(value) {
    return value + 1
}

function dec(value) {
    return value - 1
}

export const { addBonus, removeBonus, updateBonus, executeRule } = gameSclice.actions
export { executeColorRule, executeBonusRule, splitId }
export default gameSclice.reducer