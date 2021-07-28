import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';

import { GoChevronLeft } from 'react-icons/go'

import Grid from '../../components/grid';
import Clickable from '../../components/base/clickable'
import SquareElement from '../../components/base/clickable/square'
import CircleElement from '../../components/base/clickable/circle'
import Display from '../../components/base/display'
import Divider from '../../components/base/divider';
import CheckDisplay from '../../components/base/clickable/checkedDisplay';
import CircleCheckedDisplay from '../../components/base/clickable/circleCheckedDisplay';

import { Rule as TimelineRule, Css as TimelineCss } from '../../game/timeline';
import { Rule as ReplayRule } from '../../game/replay';
import { Rule as PlusOneRule } from '../../game/plusone';
import { Rule as YellowRule, Css as YellowCss } from '../../game/yellow';
import { Rule as BlueRule, Css as BlueCss, Header as BlueHeader } from '../../game/blue';
import { Rule as GreenRule, Css as GreenCss } from '../../game/green';
import { Rule as OrangeRule, Css as OrangeCss } from '../../game/orange';
import { Rule as PurpleRule, Css as PurpleCss, Input as PurpleInput } from '../../game/purple';

import style from './style.css';

import Bonus from '../../components/base/bonus';
import Content from '../../components/base/content';
import Footer from '../../components/base/content/footer';
import Box from '../../components/base/box';

import ReplayBonusDisplay from './views/replayBonusDisplay';
import PlusOneBonusDisplay from './views/plusOneBonusDisplay';
import TimelineDisplay from './views/timelineDisplay';
import GreenGridDisplay from './views/greenGridDisplay';
import { BsInfo } from 'react-icons/bs';
import InfoDisplay from './views/infoDisplay';

const Home = () => (
	<div class={`w-full flex justify-center ${style.home}`}>
		<div class="w-full mt-4 flex flex-col lg:items-center lg:max-w-3xl">
			{/* timeline */}
			<TimelineDisplay></TimelineDisplay>

			{/* replay bonus line */}
			<ReplayBonusDisplay></ReplayBonusDisplay>

			{/* +1 bonus line */}
			<PlusOneBonusDisplay></PlusOneBonusDisplay>

			{/* yellow box */}
			<div class={`mt-4 pt-2 pb-1 rounded ${YellowCss.bg} ${style.grid}`}>
				<Grid
					item={getCheckClickable}
					gridInfo={{ line: 4, column: 4 }}
					rule={YellowRule}
					css={YellowCss}
				/>
			</div>

			{/* blue box */}
			<div class={`mt-4 pt-2 pb-1 rounded ${BlueCss.bg} ${style.grid}`}>
				<Grid
					item={getDisplay}
					gridInfo={{ line: 1, column: 11 }}
					rule={BlueHeader}
				/>
				<Grid
					item={getCheckClickable}
					gridInfo={{ line: 3, column: 4 }}
					rule={BlueRule}
				/>
			</div>

			{/* green box */}
			<GreenGridDisplay></GreenGridDisplay>

			{/* orange box */}
			<div class={`mt-4 pt-2 pb-1 rounded ${OrangeCss.bg} ${style.grid}`}>
				<Grid
					item={getOrangeClickable}
					gridInfo={{ line: 1, column: 10 }}
					rule={OrangeRule}
					css={OrangeCss}
				/>
			</div>

			{/* purple box */}
			<div class={`mt-4 pt-2 pb-1 rounded ${PurpleCss.bg} ${style.grid}`}>
				<Grid
					item={getPurpleClickable}
					gridInfo={{ line: 1, column: 10, input: PurpleInput.type }}
					rule={PurpleRule}
				/>
			</div>

		</div>

	</div>
);



const getClickable = (props) => {

	return <Clickable {...props} border=" border-2 rounded border-black">
		{props.children}
	</Clickable>
}

const getDisplay = (props) => <Display {...props}></Display>

const getCheckClickable = (props) => {
	const CheckClickable = getClickable
	const [checked, setChecked] = useState(false)

	const onClick = useCallback((rule) => {
		setChecked((checked) => !checked)
	}, [])

	return <CheckClickable {...props} onClick={onClick}>
		{checked && <CheckDisplay value={checked}></CheckDisplay>}
	</CheckClickable>
}

const getOrangeClickable = (props) => {
	const OrangeClickable = getClickable
	const _props = { ...props, rule: { ...props.rule } }
	const { content } = props.rule

	_props.rule.content = null

	return <OrangeClickable {..._props}>
		<input class={style.numberInput} placeholder={content} type="number"></input>
	</OrangeClickable>
}

const PurpleDividerCmp = () => <div class={style.purpleDivider}>
	<GoChevronLeft></GoChevronLeft>
</div>

const getPurpleClickable = (props) => {
	const PurpleClickable = getClickable

	return <PurpleClickable {...props}>
		<input class={style.numberInput} type="number"></input>
		{props.number < PurpleRule[0].length - 1 && <PurpleDividerCmp />}
	</PurpleClickable>
}



export default Home;