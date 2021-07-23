import Bonus from "../bonus"
import Image from "../image"
import Indicator from "../indicator"
import Mark from "../mark"

import style from './style.css'

const Display = ({ number, value, rule , border,children}) => {

    return (
        <div class={`flex flex-col items-center relative ${style.display}`}>
            { rule.indicator && <Indicator value={rule.indicator}/>}

            <div class={`relative flex w-full justify-center p-1`}>
                <span class={`font-bold ${style.content}`}>{rule.content}</span>
            </div>
        </div>
        
    )
}

export default Display