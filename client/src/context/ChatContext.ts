import { createContext } from "react";
import { IChat } from "../interfases/chat";

interface IChatContext {
    chats: IChat[]
    getChats: () => void
    opennedChat: IChat | null
    openChat: (chat: IChat) => void
}

export const ChatContext = createContext<IChatContext>({
    chats: [],
    opennedChat: null,
    getChats: () => { },
    openChat: () => { }
})