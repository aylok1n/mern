import { useFetch } from "../hooks/useFetch";
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography, } from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AccountCircle, Send as SendIcon } from "@mui/icons-material";

type message = {
    date: string
    senderId: string
    text: string
    _id: string
}

interface IChat {
    chatId: string
    chatWith: {
        name: string
        _id: string
    }
    lastMessage: message
    messages: message[]
}

const ChatItem = ({ chat, openChat }: { chat: IChat, openChat: (chat: IChat) => void }) => {

    const getDate = () => {
        const date = new Date(chat.lastMessage.date)
        const today = new Date()
        if (date.toDateString() === today.toDateString()) return date.toTimeString().split(' ')[0]
        return date.toLocaleDateString()
    }

    const ClickHandler = () => {
        openChat(chat)
    }

    return (
        <ListItem sx={{ w: '18rem', position: 'relative' }}>
            <ListItemButton onClick={ClickHandler}>
                <ListItemIcon sx={{ w: '3rem' }}>
                    <AccountCircle />
                </ListItemIcon>
                <ListItemText sx={{ minWidth: '10rem' }} primary={chat.chatWith.name} secondary={chat.lastMessage.text} />
                <Typography variant={'body2'} component={'span'} sx={{ w: '3rem' }} >
                    {getDate()}
                </Typography>
            </ListItemButton>
        </ListItem >
    )
}

const MessageItem = ({ message }: { message: message }) => {
    const { userId } = useContext(AuthContext)
    const self = userId === message.senderId

    if (self) return (
        <div className="w-full flex justify-end">
            <div className="flex items-center justify-center rounded-2xl bg-slate-100 h-16 w-52 max-w-2xl" >
                {message.text}
            </div>
        </div>
    )


    return (
        <div className="w-full flex justify-start">
            <div className="flex items-center justify-center rounded-2xl bg-slate-300  h-16 w-52 max-w-2xl" >
                {message.text}
            </div>
        </div>
    )
}

const Chat = ({ chat }: { chat: IChat }) => {
    const [text, setText] = useState('')
    const { request, loader } = useFetch()
    const auth = useContext(AuthContext)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const changeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const sendMessage = async () => {
        inputRef.current?.blur()
        const data = await request({
            url: '/api/chat/send',
            body: {
                text,
                withId: chat.chatWith._id
            },
            method: "POST",
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
        console.log(data)
    }

    return (
        <div className="w-full h-full relative  px-2" >
            <div className="h-5/6 w-full " >
                {chat.messages.map((message) => <MessageItem key={message._id} message={message} />)}
            </div>
            <div className="relative flex-row w-full bottom-5 h-1/6 flex justify-center items-end" >
                <TextField
                    inputRef={inputRef}
                    onChange={changeTextHandler}
                    value={text}
                    sx={{ maxHeight: 120, overflow: 'hidden' }}
                    fullWidth
                    size="small"
                    multiline
                    id="outlined-basic"
                    variant="outlined"
                />
                <Button
                    disabled={loader}
                    sx={{ minHeight: 40 }}
                    variant="contained"
                    onClick={sendMessage}
                >
                    <SendIcon />
                </Button>
            </div>
        </div >
    )
}


export const ChatsPage = () => {
    const [chats, setChats] = useState<IChat[]>([])
    const [opennedChat, setOpennedChat] = useState<IChat | null>(null)
    const { request } = useFetch()
    const auth = useContext(AuthContext)

    const getChats = async () => {
        const data = await request({
            url: '/api/chat',
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        })
        setChats(data.chats)
    }

    const openChat = useCallback((chat: IChat) => {
        setOpennedChat(chat)
    }, [])

    useEffect(() => {
        getChats()
    }, [])

    return (
        <div className="w-full bg-white  p-5 h-full max-w-screen-xl flex flex-row">
            <List className="max-w-96 h-full  border-r-2 border-gray-300  ">
                {chats.map((chat, index) => <ChatItem key={index} openChat={openChat} chat={chat} />)}
            </List>
            {!!opennedChat && <Chat chat={opennedChat} />}
        </div>
    )
} 