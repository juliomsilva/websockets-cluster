require('dotenv').config({})

const redisConfig = {
  host: 'redis',
  port: 6379
}

const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const redis = require('socket.io-redis')
const emitter = require('socket.io-emitter')(redisConfig)

const app = express()

const server = http.Server(app)

server.listen(process.env.PORT, () => {
  console.log(`Server started in port: ${process.env.PORT}.`)
})

const io = socketIO(server)
io.adapter(redis(redisConfig))

io.on('connection', socket => {
  console.log('some connection')
  socket.on('message.sent', () => {
    console.log('some message')
    emitter.emit(
      'message.received',
      `broadcaster hostname ${process.env.HOSTNAME}`
    )
  })
})
