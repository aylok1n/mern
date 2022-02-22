import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { message } from "../interfases/chat"

export const MessageItem = ({ message }: { message: message }) => {
    const { user } = useContext(AuthContext)
    const self = user && user.id === message.senderId

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