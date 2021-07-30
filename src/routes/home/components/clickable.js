import { h } from 'preact'
import { useCallback, useContext } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'

import { executeRule } from '../../../app/reducers/gameSlice'

import { Context } from '../context'

import Clickable from '../../../components/base/clickable'

const ClickableElement = (props) => {
    const context = useContext(Context)
    const { id } = props

    const onClick = useCallback((rule) => {
        context.dispatch({rule,id})
    }, [])

    return <Clickable {...props} onClick={onClick} border=" border-2 rounded border-black">
        {props.children}
    </Clickable>
}

export default ClickableElement