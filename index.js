const redisConfig = {
  host: 'localhost',
  port: 6379
}

const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const redis = require('socket.io-redis')
const emitter = require('socket.io-emitter')(redisConfig)

const app = express()

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

const server = http.Server(app)
server.listen(process.env.PORT, () => {
  console.log(`Server started in port: ${process.env.PORT}.`)
  console.log(`Open this link: http://localhost:${process.env.PORT}/`)
})

const io = socketIO(server)
io.adapter(redis(redisConfig))

io.on('connection', socket => {
  socket.on('message.sent', port => {
    emitter.emit('message.received', port)
  })
})
