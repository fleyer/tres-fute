import { h } from 'preact'

import style from './style.css'

const CircleCheckDisplay = ({value}) => {

    return <div class="absolute w-full h-full top-0 flex justify-center items-center">
        <div class="w-4/5 h-4/5 border-4 border-black rounded-full">
            { value && '' }
        </div>
    </div>
}

export default CircleCheckDisplay