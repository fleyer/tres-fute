import { h } from 'preact'
import { combineReducers } from '@reduxjs/toolkit'
import gameSlice from './gameSlice'

const rootReducer = combineReducers({
    game: gameSlice,
})

export default rootReducer