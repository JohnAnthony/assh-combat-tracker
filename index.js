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

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended: false }))

io.on('connection', socket => {
	let state = { round: 0, phase: 0, order: 0 }

	socket.on('roundUp', () => {
		state = { round: state.round + 1, phase: 0, order: 0 }
		socket.emit('stateChange', state)
	})

	socket.on('roundDown', () => {
		state = { round: Math.max(state.round - 1, 0), phase: 0, order: 0 }
		socket.emit('stateChange', state)
	})

	socket.on('phaseUp', () => {
		state = { ...state, phase: state.phase + 1 }
		socket.emit('stateChange', state)
	})

	socket.on('phaseDown', () => {
		state = { ...state, phase: Math.max(state.phase - 1, 0) }
		socket.emit('stateChange', state)
	})
})

server.listen(3000)
