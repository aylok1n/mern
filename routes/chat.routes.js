const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Chat = require('../models/Chat')
const User = require('../models/User')
const router = Router()

router.post('/send', auth, async (req, res) => {
    try {
        const { text, withId } = req.body

        const message = {
            text,
            senderId: req.user.userId
        }
        const members = [withId, req.user.userId]

        let chat = await Chat.findOneAndUpdate(
            {
                $or: [
                    {
                        members
                    },
                    {
                        members: members.reverse()
                    }
                ]
            },
            {
                $push: {
                    messages: message
                }
            }
        )

        if (!chat) {
            chat = new Chat({
                members,
                messages: [message]
            })
            await chat.save()
            await User.updateMany(
                { _id: { $in: members } },
                {
                    $push: {
                        сhats: chat._id
                    }
                }
            )
        }

        return res.json({ status: true, message: "сообщение доставлено" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router