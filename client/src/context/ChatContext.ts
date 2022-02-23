import { createContext } from "react";
import { IChat } from "../interfases/chat";

interface IChatContext {
    chats: IChat[]
    getChats: () => void
}

export const ChatContext = createContext<IChatContext>({
    chats: [],
    getChats: () => { },
})