import { useCallback, useEffect, useState } from "react"
import { IAuthContext } from "../interfases/auth"
import { IChat, message } from "../interfases/chat"
import { useFetch } from "./useFetch"

export const useChat = (auth: IAuthContext) => {
    const [chats, setChats] = useState<IChat[]>([])
    const [messages, setMessages] = useState<message[]>([])

    const { request } = useFetch()
    const { ready, user, isAuthenticated } = auth

    const getChats = useCallback(async () => {
        const data = await request({
            url: '/api/chat',
            headers: {
                'Authorization': `Bearer ${user ? user.token : ''}`
            }
        })
        setChats(data.chats)
    }, [user])

    const getChatMessages = async (chatId: string) => {
        const data = await request({
            url: `/api/chat/${chatId}`,
            headers: {
                'Authorization': `Bearer ${user ? user.token : ''}`
            }
        })
        setMessages(data)
    }

    const sendMessage = useCallback(async ({ text, chatId, withId }) => {
        await request({
            url: '/api/chat/send',
            body: { text, chatId, withId },
            method: "POST",
            headers: {
                Authorization: `Bearer ${user ? user.token : ''}`
            }
        })
    }, [auth])


    useEffect(() => {
        if (ready && isAuthenticated) getChats()
    }, [ready, isAuthenticated, getChats])

    return { chats, getChats, sendMessage, messages, getChatMessages }
}