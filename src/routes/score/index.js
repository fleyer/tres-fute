import { h } from 'preact'
import { useDispatch, useSelector } from 'react-redux'

import { Id as GreenId, calculateScore as calculateGreenScore } from '../../game/green'
import { Id as BlueId, calculateScore as calculateBlueScore } from '../../game/blue'
import { Id as YellowId, calculateScore as calculateYellowScore } from '../../game/yellow'
import { Id as PurpleId, calculateScore as calculatePurpleScore } from '../../game/purple'
import { Id as OrangeId, calculateScore as calculateOrangeScore } from '../../game/orange'

import { reset } from '../../app/reducers/gameSlice'

import style from './style.css'
import { route } from 'preact-router'
import { useCallback } from 'preact/hooks'

const score = () => {
    const scores = useSelector(calculateScore)
    const dispatch = useDispatch()
    const onNewGame = useCallback(() => {
        dispatch(reset())
        route('/')
    },[])

    return <div class={`${style.score} w-full`}>
        <div class="flex space-x-4 mb-2 mt-4">
            <a class="btn btn-blue" onClick={onNewGame}>New game !</a>
        </div>
        <table class="w-full mt-4 lg:max-w-3xl table-auto bg-white rounded">
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {
                    scores.map(({id,score}) => 
                        <tr>
                            <td class="pl-2">{id}</td>
                            <td class={style.scoreContainer}>{score}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
}



const calculateScore = (state) => {
    
    const result = [
        {id: GreenId, score: calculateGreenScore(state.gameState.present[GreenId].step)},
        {id: BlueId, score: calculateBlueScore(state.gameState.present[BlueId].step)},
        {id: YellowId, score: calculateYellowScore(state.gameState.present[YellowId].step)},
        {id: OrangeId, score: calculateOrangeScore(state.gameState.present[OrangeId].step)},
        {id: PurpleId, score: calculatePurpleScore(state.gameState.present[PurpleId].step)}
    ]

    const total = { id: 'Total', score: result.reduce( (acc,curr) => acc + curr.score, 0)}

    return [ ...result, total ]
}
export default score