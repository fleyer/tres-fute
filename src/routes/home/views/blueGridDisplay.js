import { h } from 'preact'

import { useDispatch } from 'react-redux'

import { executeChainedRule } from '../../../app/reducers/blueSlice'

import Grid from '../../../components/grid'
import Display from '../../../components/base/display'

import { Css as BlueCss, Rule as BlueRule, Id as BlueId, Header as BlueHeader } from '../../../game/blue'
import CheckClickable from '../components/checkClickable'

import { Provider } from '../context'

import style from '../style.css'
import { dispatch } from '../context/defaultContext'

const BlueGridDisplay = () => {
    const dispatch =  useDispatch()

    return <div class={`mt-4 pt-2 pb-1 rounded ${BlueCss.bg} ${style.grid}`}>
        <Grid
            item={getDisplay}
            gridInfo={{ line: 1, column: 11 }}
            rule={BlueHeader}
        />

        <Provider value={{
            selector: (id) => (state) => state.blue.step[id],
            dispatch: (args) => { dispatch(executeChainedRule(args))}
        }}>
            <Grid
                item={CheckClickable}
                gridInfo={{ line: 3, column: 4, itemId: BlueId }}
                rule={BlueRule}
            />
        </Provider>
        
    </div>
}

const getDisplay = (props) => <Display {...props}></Display>

export default BlueGridDisplay