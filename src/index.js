import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

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

	reset = () => this.socket.emit('reset')
	roundUp = () => this.socket.emit('roundUp')
	roundDown = () => this.socket.emit('roundDown')
	phaseUp = () => this.socket.emit('phaseUp')
	phaseDown = () => this.socket.emit('phaseDown')
	setOrder = order => this.socket.emit('setOrder', order)

	render() {
		const state = this.state;
		return <div>
			<h1>Round: {state.round}</h1>
			<h1>Phase: {state.phase}</h1>
			<h1>Order: {state.order}</h1>

			<button onClick={this.reset}>Reset</button>
			<hr />
			<button onClick={this.roundUp}>Round Up</button>
			<button onClick={this.roundDown}>Round Down</button>
			<hr />
			<button onClick={this.phaseUp}>Phase Up</button>
			<button onClick={this.phaseDown}>Phase Down</button>
			<hr />
			<button onClick={() => this.setOrder(0)}>PCs</button>
			<button onClick={() => this.setOrder(1)}>NPCs</button>
			<button onClick={() => this.setOrder(2)}>Tied</button>
		</div>
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
