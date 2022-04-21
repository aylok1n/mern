const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const TestUser = require('../models/TestUser')
const router = Router()
const auth = require('../middleware/auth.middleware')

require('node-env-file')('.env')
const { JWT_SECRET } = process.env

// /test-api/phone
router.post(
    '/phone',
    async (req, res) => {
        try {

            const { phone, signature } = req.body
            const code = 11111

            const user = new TestUser({ phone, code })
            var sms = new (require('smsru'))({
                api_id: 'C57A11BD-4C4E-95E8-DBA1-06DD4C428046'
            });
            sms.send({
                to: phone.replace(/[^0-9]/g, ""),
                text: `<#> Твой код для Q-DIGITAL: ${code} \n Не сообщай его никому.${signature}`,
                translit: false,
                test: false,
            },
                function (err, id) {
                    if (err) {
                        console.log(err.message);
                    }
                    console.log('id смс сообщения', id);//Например: 22125-2345258
                });

            await user.save()

            res.status(201).json({ code })

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

// /test-api/phone
router.post(
    '/code',
    async (req, res) => {
        try {

            const { code } = req.body

            let user = await TestUser.findOne({ code })

            const token = jwt.sign(
                { userId: user.id },
                JWT_SECRET,
                { expiresIn: '365d' }
            )

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            res.json({ token })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

// /test-api/user-data
router.post(
    '/user-data',
    auth,
    async (req, res) => {
        try {
            const { userId } = req.user
            const { name, university, birthday, startUniversity, endUniversity } = req.body

            let user = await TestUser.findByIdAndUpdate(userId, {
                name,
                university,
                birthday,
                startUniversity,
                endUniversity,
                token,
            })

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            res.json({ staus: true })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.get(
    '/user-data',
    auth,
    async (req, res) => {
        try {
            const { userId } = req.user
            console.log(userId)

            let user = await TestUser.findById(userId)

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            res.json({ ...user._doc })

        } catch (e) {
            console.log(e, 123)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

module.exports = router