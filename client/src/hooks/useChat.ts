import { useCallback, useEffect, useState } from "react"
import { IAuthContext } from "../interfases/auth"
import { IChat } from "../interfases/chat"
import { useFetch } from "./useFetch"

export const useChat = (auth: IAuthContext) => {
    const [chats, setChats] = useState<IChat[]>([])
    const { request } = useFetch()
    const { ready, user, isAuthenticated } = auth
    const token = user ? user.token : ''

    const getChats = useCallback(async () => {
        const data = await request({
            url: '/api/chat',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setChats(data.chats)
    }, [token])


    useEffect(() => {
        if (ready && isAuthenticated) getChats()
    }, [ready, isAuthenticated, getChats])

    return { chats, getChats }
}