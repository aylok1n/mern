const express = require('express')
require('node-env-file')('.env')


const app = express()


const { PORT } = process.env

app.get('/', (req, res) => {
    res.send('123123')
})

app.listen(PORT, () => `Server started at ${PORT} port`)