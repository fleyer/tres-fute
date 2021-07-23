import {h} from 'preact'

import style from './style.css'

const Grid = ({item,gridInfo,rule,css={}})=>{
    const {line,column,input='checkbox'} = gridInfo
    const _grid = []
    const Item = item

    for(let i = 0; i < rule.length; i++){

        _grid.push([])

        for(let j = 0; j<rule[i].length; j++){
            _grid[i].push(
                <Item number={j} rule={rule[i][j]} color={css.color} inputType={input}/>
            )
        }
    }

    return (<div class={ gridInfo.line > 1 ? style.grid : ''}>
        {_grid.map(line => <div class={`flex flex-row ${style.line}`}>
            {line}
        </div>)}
    </div>)
}

export default Grid