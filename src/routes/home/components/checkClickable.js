import { h } from 'preact'

import ClickableElement from './clickable'
import CheckedDisplay from "../../../components/base/clickable/checkedDisplay"

const CheckClickable = (props) => {
	const checked = props.checked
	
	return <ClickableElement {...props}>
		{checked && <CheckedDisplay value={checked}></CheckedDisplay>}
	</ClickableElement>
}

export default CheckClickable