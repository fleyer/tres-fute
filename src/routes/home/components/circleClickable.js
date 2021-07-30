import { h } from 'preact'
import { useState, useCallback, useContext } from 'preact/hooks'

import { useSelector } from 'react-redux'
import { updateBonus } from '../../../app/reducers/gameSlice'

import Clickable from '../../../components/base/clickable'
import CircleElement from '../../../components/base/clickable/circle'
import CircleCheckedDisplay from '../../../components/base/clickable/circleCheckedDisplay'
import CheckedDisplay from '../../../components/base/clickable/checkedDisplay'

import { Context } from '../context'

const CircleClickable = (props) => {
	const { id } = props
	const [color, colorI, colorJ] = id.split('-')
	const context = useContext(Context)

	const counter = color && useSelector(context.selector(colorJ))

	const onClick = useCallback((rule) => {
		context.dispatch({ rule, id })
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
