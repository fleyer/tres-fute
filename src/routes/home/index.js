import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { useDispatch } from 'react-redux';

import { reset } from '../../app/reducers/gameSlice'

import Grid from '../../components/grid';
import Clickable from '../../components/base/clickable'
import SquareElement from '../../components/base/clickable/square'
import CircleElement from '../../components/base/clickable/circle'
import Divider from '../../components/base/divider';
import CheckDisplay from '../../components/base/clickable/checkedDisplay';
import CircleCheckedDisplay from '../../components/base/clickable/circleCheckedDisplay';

import style from './style.css';

import ReplayBonusDisplay from './views/replayBonusDisplay';
import PlusOneBonusDisplay from './views/plusOneBonusDisplay';
import TimelineDisplay from './views/timelineDisplay';
import GreenGridDisplay from './views/greenGridDisplay';
import BlueGridDisplay from './views/blueGridDisplay';
import OrangeGridDisplay from './views/orangeGridDisplay';
import PurpleGridDisplay from './views/purpleGridDisplay';

const Home = () => (
	<div class={`w-full flex justify-center ${style.home}`}>
		<div class="w-full mt-4 flex flex-col lg:items-center lg:max-w-3xl">
			<button class="btn btn-blue" onClick={useCallback(onReset(useDispatch()),[])}>reset</button>
			{/* timeline */}
			<TimelineDisplay></TimelineDisplay>

			{/* replay bonus line */}
			<ReplayBonusDisplay></ReplayBonusDisplay>

			{/* +1 bonus line */}
			<PlusOneBonusDisplay></PlusOneBonusDisplay>

			{/* yellow box */}
			{/* <div class={`mt-4 pt-2 pb-1 rounded ${YellowCss.bg} ${style.grid}`}>
				<Grid
					item={getCheckClickable}
					gridInfo={{ line: 4, column: 4 }}
					rule={YellowRule}
					css={YellowCss}
				/>
			</div> */}

			{/* blue box */}
			<BlueGridDisplay></BlueGridDisplay>

			{/* green box */}
			<GreenGridDisplay></GreenGridDisplay>

			{/* orange box */}
			<OrangeGridDisplay></OrangeGridDisplay>

			{/* purple box */}
			<PurpleGridDisplay></PurpleGridDisplay>

		</div>

	</div>
);

const onReset = (dispatch) => {
	return () => { dispatch(reset()) }
}

export default Home;