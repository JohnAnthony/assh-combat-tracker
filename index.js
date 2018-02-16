const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

BASE_STATE = { round: 1, phase: 0, order: 0 }

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended: false }))

io.on('connection', socket => {
	let state = BASE_STATE

	const newState = (s) => {
		state = s
		socket.emit('stateChange', state)
	}

	socket.on('reset', () => newState(BASE_STATE))

	socket.on('roundUp', () => newState({
		round: state.round + 1,
		phase: 0,
		order: 0
	}))

	socket.on('roundDown', () => newState({
		round: Math.max(state.round - 1, 1),
		phase: 0,
		order: 0
	}))

	socket.on('phaseUp', () => {
		if (state.phase === 0)
			return;
		else if (state.phase === 8)
			newState({ round: state.round + 1, phase: 0, order: 0 })
		else
			newState({ ...state, phase: state.phase + 1 })
	})

	socket.on('phaseDown', () => newState({
		...state,
		phase: Math.max(state.phase - 1, 0)
	}))

	socket.on('setOrder', order => {
		if (state.phase !== 0)
			return;
		newState({ ...state, phase: 1, order: order })
	})
})

server.listen(3000)
