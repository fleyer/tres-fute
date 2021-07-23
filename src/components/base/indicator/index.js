import {h} from 'preact'

import { TiStarburst } from 'react-icons/ti';

import style from './style.css'

const Indicator = ({value}) => {

    return (
        <div class={style.indicator_container}>
            <div class={style.background_star_container}>
                <TiStarburst class={style.background_star}/>
            </div>
            <span class={`text-xs text-white font-bold ${style.indicator_content}`}>{value}</span>

        </div>
    )
}

export default Indicator