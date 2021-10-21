import { h } from 'preact'

import { useCallback } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'

import { executeChainedRule } from '../../../app/reducers/blueSlice'

import Grid from '../../../components/grid'
import Display from '../../../components/base/display'

import { Css as BlueCss, Rule as BlueRule, Id as BlueId, Header as BlueHeader } from '../../../game/blue'
import CheckClickable from '../components/checkClickable'

import { Provider } from '../context'

import style from '../style.css'

const BlueGridDisplay = () => {

    return <div class={`mt-4 pt-2 pb-1 rounded ${BlueCss.bg} ${style.grid}`}>
        <Grid
            item={getDisplay}
            gridInfo={{ line: 1, column: 11 }}
            rule={BlueHeader}
        />

        <Provider value={{
            
        }}>
            <Grid
                item={getCheckClickable}
                gridInfo={{ line: 3, column: 4, itemId: BlueId }}
                rule={BlueRule}
            />
        </Provider>
        
    </div>
}

const getCheckClickable = (props) => {
    const dispatch =  useDispatch()
    const checked = useSelector((state) => state.gameState.present.blue.step[props.id])
    const onClick = useCallback((args) => dispatch(executeChainedRule(args)),[])
    const disabled = checked ? checked : false

    return <CheckClickable 
                {...props} 
                checked={checked}
                disabled={disabled}
                onClick={onClick}
    ></CheckClickable>
}

const getDisplay = (props) => <Display {...props}></Display>

export default BlueGridDisplay