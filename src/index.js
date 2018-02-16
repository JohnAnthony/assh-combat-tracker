import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

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
		return <MuiThemeProvider>
			<Paper className="main">
				<h1>Round: {state.round}</h1>
				<h1>Phase: {state.phase}</h1>
				<h1>Order: {state.order}</h1>

				<RaisedButton onClick={this.reset}>Reset</RaisedButton>
				<hr />
				<RaisedButton onClick={this.roundUp}>Round Up</RaisedButton>
				<RaisedButton onClick={this.roundDown}>Round Down</RaisedButton>
				<hr />
				<RaisedButton onClick={this.phaseUp}>Phase Up</RaisedButton>
				<RaisedButton onClick={this.phaseDown}>Phase Down</RaisedButton>
				<hr />
				<RaisedButton onClick={() => this.setOrder(0)}>PCs</RaisedButton>
				<RaisedButton onClick={() => this.setOrder(1)}>NPCs</RaisedButton>
				<RaisedButton onClick={() => this.setOrder(2)}>Tied</RaisedButton>
			</Paper>
		</MuiThemeProvider>
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
