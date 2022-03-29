import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { message } from "../interfases/chat"

export const MessageItem = ({ message }: { message: message }) => {
    const { user } = useContext(AuthContext)
    const self = user && user.id === message.senderId

    const container = (type: string) => {
        return (
            <div className={`w-full flex ${type === 'self' ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-center justify-center rounded-2xl 
                ${type === 'self' ? "bg-slate-100" : "bg-slate-300"}
                p-4 max-w-2xl break-all`} >
                    {message.text}
                </div>
            </div>
        )
    }

    if (self) return container('self')

    return container('no-self')
}