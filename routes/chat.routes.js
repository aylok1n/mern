const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Chat = require('../models/Chat')
const User = require('../models/User')
const router = Router()

// get all dialogs
router.get('/', auth, async (req, res) => {
    try {
        let chats = await Chat.find({ members: { $all: req.user.userId } })

        if (!chats) return res.json({ chats: [] })

        const response = await Promise.all(chats.map(async chat => {
            const userId = chat.members.find(member => req.user.userId !== member.toString()).toString()
            const member = await User.findById(userId).select('name image')
            return {
                chatId: chat._id,
                chatWith: member,
                lastMessage: chat.messages[chat.messages.length - 1],
            }
        }))

        res.json({ chats: response })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

// get chat by id
router.get('/:id', auth, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id.substring(1)).select('messages')

        res.json(chat.messages.reverse())

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/send', auth, async (req, res) => {
    try {
        const { text, chatId, withId } = req.body

        const message = {
            text,
            senderId: req.user.userId
        }

        if (chatId) {
            const chat = await Chat.findByIdAndUpdate(chatId.substring(1),
                {
                    $push: {
                        messages: message
                    }
                }
            )
        }
        else if (withId) {
            const members = [req.user.userId, withId]
            const chat = new Chat({
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