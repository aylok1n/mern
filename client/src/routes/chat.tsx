import { useFetch } from "../hooks/useFetch";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AccountCircle } from "@mui/icons-material";
import { Box } from "@mui/system";

type message = {
    date: string
    senderId: string
    text: string
    _id: string
}

interface Chat {
    chatId: string
    chatWith: {
        name: string
        _id: string
    }
    lastMessage: message
    messages: message[]
}

const ChatItem = ({ chat, openChat }: { chat: Chat, openChat: (chat: Chat) => void }) => {

    const getDate = () => {
        const date = new Date(chat.lastMessage.date)
        const today = new Date()
        if (date.toDateString() === today.toDateString()) return date.toTimeString().split(' ')[0]
        return date.toDateString()
    }

    const ClickHandler = () => {
        openChat(chat)
    }

    return (
        <ListItem>
            <ListItemButton onClick={ClickHandler}>
                <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={chat.chatWith.name} secondary={chat.lastMessage.text} />
                <Box sx={{ p: 3 }}>
                    <Typography>{getDate()}</Typography>
                </Box>
            </ListItemButton>
        </ListItem>
    )
}


export const ChatsPage = () => {
    const [chats, setChats] = useState<Chat[]>([])
    const [opennedChat, setOpennedChat] = useState<Chat | null>(null)
    const { request } = useFetch()
    const auth = useContext(AuthContext)

    useEffect(() => {
        getChats()
    }, [])

    const getChats = async () => {
        const data = await request({
            url: '/api/chat',
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        })
        setChats(data.chats)
    }

    const openChat = useCallback((chat: Chat) => {
        setOpennedChat(chat)
    }, [opennedChat])

    return (
        <div className="w-full py-5 max-w-screen-xl flex flex-row">
            <List className="max-w-96 h-screen shadow-lg bg-teal-100">
                {chats.map(chat => <ChatItem openChat={openChat} chat={chat} />)}
            </List>
            {!!opennedChat && (
                <div className="w-full h-full bg-slate-400">
                    {JSON.stringify(opennedChat)}
                </div>
            )}
        </div>
    )
} 