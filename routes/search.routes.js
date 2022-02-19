const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = Router()

router.get('/users', auth, async (req, res) => {
    try {
        const { search } = req.query
        const users = await User.find({ "name": { "$regex": search, "$options": "i" } }).select('name email')
        return res.json({ users })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router