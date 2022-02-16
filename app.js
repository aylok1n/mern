const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

require('node-env-file')('.env')
const { PORT, PRODUCTION, MONGOURI } = process.env

const app = express()
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))

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
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()