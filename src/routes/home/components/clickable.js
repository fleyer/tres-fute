import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'

import { executeRule } from '../../../app/reducers/gameSlice'

import Clickable from '../../../components/base/clickable'

const ClickableElement = (props) => {
    // const { onClick } = props
    const dispatch = useDispatch()
    const { id } = props

    const _onClick = useCallback((rule) => {
        dispatch(executeRule({id,rule}))
    }, [])

    return <Clickable {...props} onClick={_onClick} border=" border-2 rounded border-black">
        {props.children}
    </Clickable>
}

export default ClickableElement