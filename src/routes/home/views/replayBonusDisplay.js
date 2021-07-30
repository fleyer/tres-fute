import { h } from 'preact'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'

import Grid from '../../../components/grid'
import Bonus from '../../../components/base/bonus'

import CircleClickable from '../components/circleClickable'
import { Provider as ReplayProvider } from '../context'

import { Rule as ReplayRule, Id as ReplayId } from '../../../game/replay'

import style from '../style.css'

const ReplayBonusDisplay = () => {
    const dispatch = useDispatch()
    const replaySelector = (id) => (state) => state.game.replay[id]
    const replayDispatch = useCallback((args) => {}, [])

    return <div class={`mt-4 rounded border-2 border-gray-50 bg-gray-400 ${style.grid}`}>
        <ReplayProvider value={{
            selector: replaySelector,
            dispatch: replayDispatch
        }}>
            <Grid
                item={CircleClickable}
                gridInfo={{ line: 1, column: 7, itemId: ReplayId }}
                rule={ReplayRule}
            />
        </ReplayProvider>
        

        <div class={style.bonusHeader}><Bonus value={'replay'}></Bonus></div>
    </div>
}



export default ReplayBonusDisplay