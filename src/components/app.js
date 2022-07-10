import { h } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'react-redux'

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Score from '../routes/score'

export default (props) => (
	<Provider store={props.store}>
		<div id="app">
			<Header />
			<Router>
				<Home path="/" />
				<Score path="/score"/>
			</Router>
		</div>
	</Provider>
)
