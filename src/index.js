import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			round: 0,
			phase: 0,
			order: 0
		}
	}

	componentDidMount() {
		this.socket = io('/')
		this.socket.on('stateChange', state => this.setState(state))
	}

	roundUp = () => this.socket.emit('roundUp')
	roundDown = () => this.socket.emit('roundDown')
	phaseUp = () => this.socket.emit('phaseUp')
	phaseDown = () => this.socket.emit('phaseDown')

	render() {
		const state = this.state;
		return <div>
			<h1>Round: {state.round}</h1>
			<h1>Phase: {state.phase}</h1>
			<h1>Order: {state.order}</h1>

			<button onClick={this.roundUp}>Round Up</button>
			<button onClick={this.roundDown}>Round Down</button>
			<button onClick={this.phaseUp}>Phase Up</button>
			<button onClick={this.phaseDown}>Phase Down</button>
		</div>
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
