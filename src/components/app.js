import { h } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'react-redux'

import store from '../app/store'
import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';

export default (props) => (
	<Provider store={props.store}>
		<div id="app">
			<Header />
			<Router>
				<Home path="/" />
			</Router>
		</div>
	</Provider>
)
