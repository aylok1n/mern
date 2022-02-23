import { Button, TextField } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { Send as SendIcon } from "@mui/icons-material"
import { MessageItem } from "../components/messageItem"
import { message } from "../interfases/chat"
import target from '../img/target.gif'
import { useParams } from "react-router-dom"
import { ChatContext } from "../context/ChatContext"

export const NoOpenChat = () => (
    <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="w-36">
            <img src={target} alt={''} />
        </div>
        <p>Чат-то откройте...</p>
    </div>
)

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

    const send = () => {
        sendMessage({
            text,
            chatId: params.id
        })
        inputRef.current?.blur()
        setText('')
    }

    return (
        <div className="w-full h-full relative px-2" >
            <div className="h-5/6 w-full flex gap-y-4 flex-col" >
                {messages.map((message: message) => <MessageItem key={message._id} message={message} />)}
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
                    onClick={send}
                >
                    <SendIcon />
                </Button>
            </div>
        </div >
    )
}