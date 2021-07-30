import { h } from 'preact'
import { combineReducers } from '@reduxjs/toolkit'
import gameSlice from './gameSlice'
import greenSlice from './greenSlice'
import blueSlice from './blueSlice'

const rootReducer = combineReducers({
    game: gameSlice,
    blue: blueSlice,
    green: greenSlice
})

export default rootReducer