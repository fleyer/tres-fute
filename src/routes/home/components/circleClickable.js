import { h } from 'preact'
import { useState, useCallback } from 'preact/hooks'

import { useDispatch, useSelector } from 'react-redux'
import { updateBonus } from '../../../app/reducers/gameSlice'

import Clickable from '../../../components/base/clickable'
import CircleElement from '../../../components/base/clickable/circle'
import CircleCheckedDisplay from '../../../components/base/clickable/circleCheckedDisplay'
import CheckedDisplay from '../../../components/base/clickable/checkedDisplay'


const CircleClickable = (props) => {
	const { id } = props
	const [color, colorId] = id.split('-')
	const dispatch = useDispatch()

	const counter = color && useSelector((state) => state.game[color][colorId])

	const onClick = useCallback((rule) => {
		dispatch(updateBonus({ rule, id }))
	}, [])

	return <Clickable
		{...props}
		border=" border-2 rounded border-black"
		displayElement={CircleElement}
		onClick={onClick}
	>
		{counter > 0 && <CircleCheckedDisplay value="true"></CircleCheckedDisplay>}
		{counter > 1 && <CheckedDisplay value="true"></CheckedDisplay>}
	</Clickable>
}

export default CircleClickable
