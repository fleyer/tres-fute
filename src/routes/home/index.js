import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { useDispatch } from 'react-redux';
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { ActionCreators } from 'redux-undo';

import { reset } from '../../app/reducers/gameSlice'
import store from '../../app/store'
import style from './style.css';

import ReplayBonusDisplay from './views/replayBonusDisplay';
import PlusOneBonusDisplay from './views/plusOneBonusDisplay';
import TimelineDisplay from './views/timelineDisplay';
import GreenGridDisplay from './views/greenGridDisplay';
import BlueGridDisplay from './views/blueGridDisplay';
import OrangeGridDisplay from './views/orangeGridDisplay';
import PurpleGridDisplay from './views/purpleGridDisplay';
import YellowGridDisplay from './views/yellowGridDisplay';
import { Link } from 'preact-router';

const Home = () => (
	<div class={`w-full flex justify-center ${style.home}`}>
		<div class="w-full mt-4 flex flex-col lg:items-center lg:max-w-3xl">
			<div class="flex space-x-4 mb-2">
				<button class="btn btn-blue" onClick={()=>{store.dispatch(ActionCreators.undo())}}><FaUndo></FaUndo></button>
				<button class="btn btn-blue" onClick={()=>{store.dispatch(ActionCreators.redo())}}><FaRedo></FaRedo></button>
				<button class="btn btn-blue" onClick={useCallback(onReset(useDispatch()),[])}>reset</button>
				<Link class="btn btn-blue" href="/score">Finish</Link>
			</div>
			{/* timeline */}
			<TimelineDisplay></TimelineDisplay>

			{/* replay bonus line */}
			<ReplayBonusDisplay></ReplayBonusDisplay>

			{/* +1 bonus line */}
			<PlusOneBonusDisplay></PlusOneBonusDisplay>

			{/* yellow box */}
			<YellowGridDisplay></YellowGridDisplay>

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