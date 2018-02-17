import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CombatController from './controller.js'

ReactDOM.render(
	<BrowserRouter>
		<main>
			<Switch>
				<Route path='/' component={CombatController} />
			</Switch>
		</main>
	</BrowserRouter>,
	document.getElementById('root')
);
