import { h } from 'preact'
import { combineReducers } from '@reduxjs/toolkit'

import timelineSlice from './timelineSlice'
import gameSlice from './gameSlice'
import greenSlice from './greenSlice'
import orangeSlice from './orangeSlice'
import blueSlice from './blueSlice'
import purpleSlice from './purpleSlice'

const rootReducer = combineReducers({
    timeline: timelineSlice,
    game: gameSlice,
    blue: blueSlice,
    green: greenSlice,
    orange: orangeSlice,
    purple: purpleSlice,
})

export default rootReducer