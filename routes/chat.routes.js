const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Chat = require('../models/Chat')
const User = require('../models/User')
const router = Router()

// get all chats
router.get('/', auth, async (req, res) => {
    try {
        let chats = await Chat.find({ members: { $all: req.user.userId } })

        if (!chats) return res.json({ chats: [] })

        const response = await Promise.all(chats.map(async chat => {
            const member = await User.findById(chat.members.find(member => member !== req.user.userId)).select('name image')
            return {
                chatId: chat._id,
                chatWith: member,
                lastMessage: chat.messages[chat.messages.length - 1],
                messages: chat.messages
            }
        }))

        res.json({ chats: response })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

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
                        $and: [
                            { "members.0": members[0] },
                            { "members.1": members[1] }
                        ]
                    },
                    {
                        $and: [
                            { "members.0": members[1] },
                            { "members.1": members[0] }
                        ]
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
        }

        return res.json({ status: true, message: "сообщение доставлено" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router