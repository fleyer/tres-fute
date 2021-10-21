import { h } from 'preact'
import { useState, useCallback, useContext } from 'preact/hooks'

import { useDispatch, useSelector } from 'react-redux'
import { updateBonus } from '../../../app/reducers/gameSlice'

import Clickable from '../../../components/base/clickable'
import CircleElement from '../../../components/base/clickable/circle'
import CircleCheckedDisplay from '../../../components/base/clickable/circleCheckedDisplay'
import CheckedDisplay from '../../../components/base/clickable/checkedDisplay'


const CircleClickable = (props) => {
	const { counter } = props

	return <div onClick={_onClick.bind(null, props)}>
		<Clickable
			{...props}
			border=" border-2 rounded border-black"
			displayElement={CircleElement}>
			{counter > 0 && <CircleCheckedDisplay value="true"></CircleCheckedDisplay>}
			{counter > 1 && <CheckedDisplay value="true"></CheckedDisplay>}
		</Clickable>
	</div>
}

const _onClick = ({ rule, disabled, onClick, id }) => {

	!rule.tail &&
		(disabled === undefined || !disabled) &&
		typeof onClick === 'function' && onClick({ rule, id })
}

export default CircleClickable
