import { h } from 'preact'
import { useState, useCallback, useContext } from 'preact/hooks'
import { useSelector } from 'react-redux'

import { Context } from '../context'

import ClickableElement from './clickable'
import CheckedDisplay from "../../../components/base/clickable/checkedDisplay"

const CheckClickable = (props) => {
	const context = useContext(Context)

	const checked = useSelector(context.selector(props.id))

	return <ClickableElement {...props}>
		{checked && <CheckedDisplay value={checked}></CheckedDisplay>}
	</ClickableElement>
}

export default CheckClickable