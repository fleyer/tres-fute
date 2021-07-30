import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import { useDispatch } from 'react-redux'

import Grid from '../../../components/grid'
import Bonus from '../../../components/base/bonus'

import CircleClickable from '../components/circleClickable'
import { Provider as PlusOneProvider } from '../context'

import { Rule as PlusOneRule, Id as PlusOneId } from '../../../game/plusone'

import style from '../style.css'

const PlusOneBonusDisplay = () => {
    const dispatch = useDispatch()
    const plusOneSelector = (id) => (state) => state.game['+1'][id]
    const plusOneDispatch = useCallback((args) => {}, [])

    return <div class={`mt-4 rounded border-2 border-gray-50 bg-gray-400 ${style.grid}`}>
        <PlusOneProvider value={{
            dispatch: plusOneDispatch,
            selector: plusOneSelector
        }}>
            <Grid
                item={CircleClickable}
                gridInfo={{ line: 1, column: 7, itemId: PlusOneId }}
                rule={PlusOneRule}
            />
        </PlusOneProvider>
        

        <div class={style.bonusHeader}><Bonus value={'+1'}></Bonus></div>
    </div>
}


export default PlusOneBonusDisplay