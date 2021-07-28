import { h } from 'preact'
import { useState, useCallback } from 'preact/hooks'

import ClickableElement from './clickable'
import CheckedDisplay from "../../../components/base/clickable/checkedDisplay"
import { useSelector } from 'react-redux'

const CheckClickable = (props) => {
	const [colorId,id] = props.id.split('-')

	const checked = useSelector((state) => state.game[colorId] ? state.game[colorId][id] : false)

	return <ClickableElement {...props}>
		{checked && <CheckedDisplay value={checked}></CheckedDisplay>}
	</ClickableElement>
}

export default CheckClickable