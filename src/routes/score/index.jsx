import { Fragment, h } from 'preact'
import { useDispatch, useSelector } from 'react-redux'

import { Id as GreenId, calculateScore as calculateGreenScore, isWoldChecked as isGreenWolfChecked } from '../../game/green'
import { Id as BlueId, calculateScore as calculateBlueScore, isWolfChecked as IsBlueWolfChecked } from '../../game/blue'
import { Id as YellowId, calculateScore as calculateYellowScore, isWolfChecked as isYellowWolfChecked } from '../../game/yellow'
import { Id as PurpleId, calculateScore as calculatePurpleScore, isWolfChecked as isPurpleWolfChecked } from '../../game/purple'
import { Id as OrangeId, calculateScore as calculateOrangeScore, isWolfChecked as isOrangeWolfChecked } from '../../game/orange'

import { reset } from '../../app/reducers/gameSlice'

import style from './style.module.css'
import { route } from 'preact-router'
import { useCallback } from 'preact/hooks'
import Bonus from '../../components/base/bonus'

const score = () => {
    const scores = useSelector(calculateScore)
    const dispatch = useDispatch()

    const onNewGame = useCallback(() => {
        dispatch(reset())
        route('/')
    },[])
    const back = useCallback(() => {
        window.history.back()
    })

    return <div class={`${style.score} w-full`}>
        <div class="flex space-x-4 mb-2 mt-4">
            <a onClick={back}><button class="btn btn-blue">Back</button></a>
            <a onClick={onNewGame}><button class="btn btn-blue">New game !</button></a>
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
                    scores.map(({id,score,description}) => 
                        <tr>
                            <td class="pl-2">{id}</td>
                            <td class={style.scoreContainer}>{score}</td>
                            <td class={style.scoreContainer}>{description?.()}</td>
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

    const wolfs = [
        isGreenWolfChecked(state.gameState.present[GreenId].step),
        isOrangeWolfChecked(state.gameState.present[OrangeId].step),
        isPurpleWolfChecked(state.gameState.present[PurpleId].step),
        IsBlueWolfChecked(state.gameState.present[BlueId].step),
        isYellowWolfChecked(state.gameState.present[YellowId].step)
    ]

    const minScore = result.sort((r1,r2) => r1.score - r2.score)[0].score
    const wolfCount = wolfs.filter(isChecked => isChecked).length
    const wolfScore = wolfCount * minScore

    console.log(wolfs)

    result.push({
        id: 'wolf', score: wolfScore, 
        description: () => <Fragment>
            { wolfCount } x <Bonus value="wolf" css="inline-flex items-center align-middle"/>
        </Fragment>
    })

    const total = { 
        id: 'Total', 
        score: result.reduce( (acc,curr) => acc + curr.score, 0)
    }

    return [ ...result, total ]
}
export default score