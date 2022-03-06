const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

require('node-env-file')('.env')
const { PORT, PRODUCTION, MONGOURI } = process.env

const app = express()
const cors = require('cors')
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/search', require('./routes/search.routes'))
app.use('/api/chat', require('./routes/chat.routes'))
app.use(cors())
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})
const startSocket = require('./socket')

if (PRODUCTION) {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        startSocket(io)

        server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()