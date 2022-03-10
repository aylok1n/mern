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
            const userId = chat.members.find(member => req.user.userId !== member.toString())?.toString()
            const member = await User.findById(userId).select('_id name isOnline lastSeen image')
            return {
                chatId: chat._id,
                chatWith: member,
                lastMessage: chat.messages[chat.messages.length - 1],
            }
        }))

        res.status(200).json({ chats: response })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

// get chat by id
router.get('/:id', auth, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id.substring(1)).select('messages members')

        if (chat) {
            const memberId = chat.members.find(memberId => memberId.toString() !== req.user.userId)
            if (memberId) {
                const member = await User.findById(memberId).select('_id name isOnline lastSeen image')
                if (member) {
                    return res.json({
                        messages: chat.messages.reverse(),
                        member
                    })
                }
            }
        }
        else throw new Error()

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/send', auth, async (req, res) => {
    try {
        const { text, chatId, withId } = req.body

        console.log(text, chatId, withId)

        const message = {
            text: text || `"отправитель еблан не указал текст сообщения"`,
            senderId: req.user.userId
        }

        if (chatId) {
            await Chat.findByIdAndUpdate(chatId.substring(1),
                {
                    $push: {
                        messages: message
                    }
                }
            )
            return res.json({ status: true, message: "сообщение доставлено" })
        }

        else if (withId) {
            const members = [req.user.userId, withId]

            const chat = await Chat.find({
                $or: [
                    {
                        members: members
                    },
                    {
                        members: members.reverse()
                    }
                ]
            })

            if (!!chat) {
                const chat = new Chat({
                    members,
                    messages: [message]
                })
                await chat.save()
            }

            return res.status(201).json({ status: true, message: "сообщение доставлено", chatId: chat._id })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router