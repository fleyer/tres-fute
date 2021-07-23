import { h } from 'preact'

import style from './style.css'

const CheckDisplay = ({value}) => {

    return <div class="absolute top-0 w-full h-full flex justify-center items-center font-bold text-2xl opacity-75">
        { value && 'X' }
    </div>
}

export default CheckDisplay