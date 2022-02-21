import { useCallback, useEffect, useState } from "react"
import { IAuthContext } from "../interfases/auth"
import { IChat } from "../interfases/chat"
import { useFetch } from "./useFetch"

export const useChat = (auth: IAuthContext) => {
    const [chats, setChats] = useState<IChat[]>([])
    const [opennedChat, setOpennedChat] = useState<IChat | null>(null)
    const { request } = useFetch()
    const { ready, token, isAuthenticated } = auth

    const getChats = useCallback(async () => {
        const data = await request({
            url: '/api/chat',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setChats(data.chats)
    }, [token])

    const openChat = useCallback((chat: IChat) => {
        setOpennedChat(chat)
    }, [])

    useEffect(() => {
        if (ready && isAuthenticated) getChats()
    }, [ready, isAuthenticated, getChats])

    return { chats, getChats, opennedChat, openChat }
}