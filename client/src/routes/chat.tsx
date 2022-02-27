import { Button, TextField } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { Send as SendIcon } from "@mui/icons-material"
import { MessageItem } from "../components/messageItem"
import { message } from "../interfases/chat"
import target from '../img/target.gif'
import { useParams } from "react-router-dom"
import { ChatContext } from "../context/ChatContext"
import { io } from "socket.io-client";
const socket = io();

export const NoOpenChat = () => {
    const { clearChatHeader } = useContext(ChatContext)

    useEffect(() => {
        clearChatHeader()
    }, [])

    return (
        < div className="flex flex-col justify-center items-center h-full w-full" >
            <div className="w-36">
                <img src={target} alt={''} />
            </div>
            <p>Чат-то откройте...</p>
        </div >
    )
}

export const OpenChat = () => {
    const [text, setText] = useState('')

    const params = useParams()
    const { loader } = useFetch()
    const { sendMessage, messages, getChatMessages } = useContext(ChatContext)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const changeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    useEffect(() => {
        !!params.id && getChatMessages(params.id)
    }, [params.id])

    useEffect(() => {
        socket.on('hi', msg => {
            console.log(msg)
        })
    }, [])

    const send = async () => {
        socket.emit('chat message', 'input.value');
        inputRef.current?.blur()
        sendMessage({
            text,
            chatId: params.id
        })
        !!params.id && getChatMessages(params.id)
        setText('')
    }

    const enterKeyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) send()
    }

    return (
        <div className="w-full flex flex-col-reverse" >
            <div className="flex-row w-full flex justify-center items-end px-2 mt-5" >
                <TextField
                    inputRef={inputRef}
                    onChange={changeTextHandler}
                    value={text}
                    sx={{ maxHeight: 120, overflow: 'hidden', pr: 1 }}
                    fullWidth
                    size="small"
                    multiline
                    id="outlined-basic"
                    variant="outlined"
                    onKeyPress={enterKeyHandler}
                />
                <Button
                    disabled={loader}
                    sx={{ minHeight: 40 }}
                    variant="contained"
                    onClick={send}
                >
                    <SendIcon />
                </Button>
            </div>
            <div className="w-full flex gap-y-4 flex-col-reverse scroll px-2 flex-1" >
                {messages.map((message: message) => <MessageItem key={message._id} message={message} />)}
            </div>
        </div >
    )
}