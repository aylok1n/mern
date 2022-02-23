import { Button, TextField } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useFetch } from "../hooks/useFetch"
import { Send as SendIcon } from "@mui/icons-material"
import { MessageItem } from "../components/messageItem"
import { message } from "../interfases/chat"
import target from '../img/target.gif'
import { useParams } from "react-router-dom"

export const NoOpenChat = () => (
    <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="w-36">
            <img src={target} alt={''} />
        </div>
        <p>Чат-то откройте...</p>
    </div>
)

export const OpenChat = () => {
    const params = useParams()
    const [messages, setMessages] = useState<message[]>([])
    const [text, setText] = useState('')
    const { request, loader } = useFetch()
    const auth = useContext(AuthContext)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const changeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    useEffect(() => {
        request({
            url: `/api/chat/${params.id}`,
            headers: {
                'Authorization': `Bearer ${auth.user ? auth.user.token : ''}`
            }
        }).then(setMessages)
    }, [params, auth, request])

    const sendMessage = async () => {
        inputRef.current?.blur()
        setText('')
        await request({
            url: '/api/chat/send',
            body: {
                text,
                chatId: params.id
            },
            method: "POST",
            headers: {
                Authorization: `Bearer ${auth.user ? auth.user.token : ''}`
            }
        })
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
                    onClick={sendMessage}
                >
                    <SendIcon />
                </Button>
            </div>
        </div >
    )
}