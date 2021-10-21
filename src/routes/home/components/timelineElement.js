import { h } from 'preact'

import Box from '../../../components/base/box'
import Footer from '../../../components/base/content/footer'
import CheckClickable from './checkClickable'

import style from '../style.css'

const TimelineElement = (props) => {
	const { rule } = props
	const { footer } = rule

	return <Box css="relative flex flex-col bg-gray-500 items-center">
		<CheckClickable {...props} 
			border="border-2 border-black rounded border-block">
		</CheckClickable>
		<div class={`mt-1 h-6 text-white ${style.footer}`}>
			{footer ? <Footer elements={footer}></Footer> : ''}
		</div>
	</Box>
}

export default TimelineElement