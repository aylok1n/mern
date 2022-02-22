import { Button, TextField } from "@mui/material"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useFetch } from "../hooks/useFetch"
import { Send as SendIcon } from "@mui/icons-material"
import { MessageItem } from "./messageItem"
import { ChatContext } from "../context/ChatContext"
import { message } from "../interfases/chat"
import target from '../img/target.gif'


export const Chat = () => {
    const { opennedChat } = useContext(ChatContext)
    const [text, setText] = useState('')
    const { request, loader } = useFetch()
    const auth = useContext(AuthContext)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const changeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const sendMessage = async () => {
        if (opennedChat) {
            inputRef.current?.blur()
            setText('')
            await request({
                url: '/api/chat/send',
                body: {
                    text,
                    withId: opennedChat.chatWith._id
                },
                method: "POST",
                headers: {
                    Authorization: `Bearer ${auth.user ? auth.user.token : ''}`
                }
            })
        }
    }

    if (!opennedChat) {
        return (
            <div className="flex flex-col justify-center items-center h-full w-full">
                <div className="w-36">
                    <img src={target} />
                </div>
                <p>Чат-то откройте...</p>
            </div>
        )
    }

    return (
        <div className="w-full h-full relative  px-2" >
            <div className="h-5/6 w-full flex gap-y-4 flex-col" >
                {opennedChat.messages.map((message: message) => <MessageItem key={message._id} message={message} />)}
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