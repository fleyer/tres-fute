import { h } from 'preact'
import { combineReducers } from '@reduxjs/toolkit'
import undoable from 'redux-undo'

import gameSlice from './gameSlice'
import timelineSlice from './timelineSlice'
import greenSlice from './greenSlice'
import orangeSlice from './orangeSlice'
import blueSlice from './blueSlice'
import purpleSlice from './purpleSlice'
import yellowSlice from './yellowSlice'

const MAX = 50

const groupBy = (action, currentState, previousHistory) => {

    return action && action.payload && action.payload.id ? action.payload.id : null
}

const rootReducer = combineReducers({
    // timeline: timelineSlice,
    // blue: blueSlice,
    // green: undoable(greenSlice,{limit: false}),
    // orange: orangeSlice,
    gameState: undoable(combineReducers({
        game: gameSlice,
        timeline: timelineSlice,
        yellow: yellowSlice,
        purple: purpleSlice,
        blue: blueSlice,
        green: greenSlice,
        orange: orangeSlice
    }), { limit: false, groupBy: groupBy }),
})


export default rootReducer