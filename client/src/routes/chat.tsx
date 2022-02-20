import { useFetch } from "../hooks/useFetch";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, } from "@mui/material";
import { useContext, useEffect, useState } from "react";
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

const ChatItem = ({ chat }: { chat: Chat }) => {

    const getDate = () => {
        const date = new Date(chat.lastMessage.date)
        const today = new Date()
        if (date.toDateString() === today.toDateString()) return date.toTimeString().split(' ')[0]
        return date.toDateString()
    }

    return (
        <ListItem>
            <ListItemButton>
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


export const ChatPage = () => {
    const [chats, setChats] = useState<Chat[]>([])
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


    return (
        <div className="w-full my-5 max-w-screen-xl flex-row">
            <List className="w-96 h-full shadow-lg bg-teal-100">
                {chats.map(chat => <ChatItem chat={chat} />)}
            </List>
        </div>
    )
} 