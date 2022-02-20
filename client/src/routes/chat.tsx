import { useFetch } from "../hooks/useFetch";
import { Button, TextField, } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";


export const ChatPage = () => {
    const [text, setText] = useState('')
    const { request } = useFetch()
    const auth = useContext(AuthContext)

    const send = async () => {
        const data = await request({
            url: '/api/chat/send',
            body: {
                text,
                withId: "6211e0df4d03d1792cd1bb26"
            },
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        })
        console.clear()
        console.log(data)
    }

    return (
        <div>
            <div>
                <TextField value={text} id="standard-basic" name="письмо" label="письмо" onChange={e => setText(e.currentTarget.value)} variant="standard" />
                <Button variant="text" onClick={send} >отправить</Button>
            </div>
        </div>
    )
} 