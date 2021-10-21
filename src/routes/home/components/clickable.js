import { h } from 'preact'
import { useCallback } from 'preact/hooks'

import Clickable from '../../../components/base/clickable'

const ClickableElement = (props) => {
    const { disabled, error } = props
    const borderColor = error ? 'red-500' : 'black'

    return <div onClick={useCallback(_onClick.bind(null, props), [disabled])}>
        <Clickable {...props} border={`border-2 rounded border-${borderColor}`}>
            {props.children}
        </Clickable>
    </div>
}

const _onClick = ({ rule, disabled, onClick, id }) => {
    !rule.tail &&
    disabled != undefined && !disabled &&
    typeof onClick === 'function' && onClick({ rule, id })
}

export default ClickableElement