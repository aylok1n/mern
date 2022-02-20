const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Chat = require('../models/Chat')
const User = require('../models/User')
const router = Router()

// get all messages
router.get('/', auth, async (req, res) => {
    try {
        let chats = await Chat.find(
            {
                $or: [
                    { "members[0]": req.user.userId },
                    { "members[1]": req.user.userId }
                ]
            }
        )

        if (!chats) return res.json({ chats: [] })

        res.json({
            chats: chats.map(chat => {
                return {
                    chatId: chat._id,
                    chatWithId: chat.members.find(member => member !== req.user.userId),
                    lastMessage: chat.messages[chat.messages.length - 1],
                    messages: chat.messages
                }
            })
        })

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
        }

        return res.json({ status: true, message: "сообщение доставлено" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router