import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const ORDER_STRINGS = [
	'Players > Monsters',
	'Monsters > Players',
	'Tied'
];

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			round: 1,
			phase: 0,
			order: 0
		}
	}

	componentDidMount() {
		this.socket = io('/')
		this.socket.on('stateChange', state => this.setState(state))
	}

	componentWillUnmount() {
		this.socket.disconnect()
	}

	reset = () => this.socket.emit('reset')
	roundUp = () => this.socket.emit('roundUp')
	roundDown = () => this.socket.emit('roundDown')
	phaseUp = () => this.socket.emit('phaseUp')
	phaseDown = () => this.socket.emit('phaseDown')
	setOrder = order => this.socket.emit('setOrder', order)

	render() {
		const state = this.state;

		let order_section;
		if (state.phase === 0 ) {
			order_section = <div>
				<h3>Determine initiative</h3>
				<div className="button-collection">
					<RaisedButton onClick={() => this.setOrder(0)}>PCs</RaisedButton>
					<RaisedButton onClick={() => this.setOrder(1)}>NPCs</RaisedButton>
					<RaisedButton onClick={() => this.setOrder(2)}>Tied</RaisedButton>
				</div>
			</div>;
		} else {
			order_section = <div>
				<h3>Initiative:</h3>
				<h2>{ORDER_STRINGS[state.order]}</h2>
			</div>;
		}

		return <MuiThemeProvider>
			<Paper className="main">
				<div className="button-collection">
					<div></div>
					<RaisedButton onClick={this.reset}>Reset</RaisedButton>
				</div>
				<hr />

				<h1>Round: {state.round}</h1>
				<div className="button-collection">
					<RaisedButton onClick={this.roundDown}>Previous</RaisedButton>
					<RaisedButton onClick={this.roundUp}>Next</RaisedButton>
				</div>
				<hr />

				{order_section}
				<hr />
				
				<h1>Phase: {state.phase}</h1>
				<div className="button-collection">
					<RaisedButton onClick={this.phaseDown}>Previous</RaisedButton>
					<RaisedButton onClick={this.phaseUp}>Next</RaisedButton>
				</div>
			</Paper>
		</MuiThemeProvider>
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
