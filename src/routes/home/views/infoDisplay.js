import { h } from 'preact'
import { useSelector } from "react-redux"

const InfoDisplay = () => {
    const plusOne = useSelector((state) => state.game['+1'])
    const replay = useSelector((state) => state.game['replay'])

    return <div class="p-2"> <p>
        +1 : {plusOne.length} 
        {/* +1 : {plusOne} <br></br>
        replay : {replay}   */}
        </p></div>
}

export default InfoDisplay