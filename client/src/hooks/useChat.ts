import { useCallback, useEffect, useState } from "react"
import { IAuthContext } from "../interfases/auth"
import { IChat, ISendMessageBody, message } from "../interfases/chat"
import { useFetch } from "./useFetch"

export const useChat = (auth: IAuthContext) => {
    const [chats, setChats] = useState<IChat[]>([])
    const [messages, setMessages] = useState<message[]>([])
    const [chatWith, setChatwith] = useState<IChat['chatWith'] | null>(null)

    const { request } = useFetch()
    const { ready, user, isAuthenticated } = auth

    const getChats = useCallback(async () => {
        if (user && user.token) {
            const data = await request({
                url: '/api/chat',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setChats(data.chats)
        }
    }, [user, ready])

    const getChatMessages = async (chatId: string) => {
        const data = await request({
            url: `/api/chat/${chatId}`,
            headers: {
                'Authorization': `Bearer ${user ? user.token : ''}`
            }
        })
        setChatwith(data.member)
        setMessages(data.messages)
    }

    const clearChatHeader = useCallback(() => {
        setChatwith(null)
    }, [])

    const sendMessage = async (body: ISendMessageBody) => {
        const response = await request({
            url: '/api/chat/send',
            body: body,
            method: "POST",
            headers: {
                Authorization: `Bearer ${user ? user.token : ''}`
            }
        })
        return response
    }

    useEffect(() => {
        if (ready && isAuthenticated) {
            getChats()
        }
    }, [ready, isAuthenticated, user])

    return { chats, getChats, sendMessage, messages, getChatMessages, chatWith, clearChatHeader }
}