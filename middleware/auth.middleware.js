const jwt = require('jsonwebtoken')

require('node-env-file')('.env')
const { JWT_SECRET } = process.env

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации' })
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({ message: 'Нет авторизации' })
    }
}