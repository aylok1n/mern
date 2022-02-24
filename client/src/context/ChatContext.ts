import { createContext } from "react";
import { IChat, message } from "../interfases/chat";

interface IChatContext {
    chats: IChat[]
    getChats: () => void
    sendMessage: ({ text, chatId, withId }: { text: string, chatId?: string, withId?: string }) => void
    messages: message[]
    getChatMessages: (chatId: string) => void
    chatWith: IChat['chatWith'] | null
    clearChatHeader: () => void
}

export const ChatContext = createContext<IChatContext>({
    chats: [],
    getChats: () => { },
    sendMessage: ({ text, chatId, withId }) => { },
    messages: [],
    getChatMessages: (chatId) => { },
    chatWith: null,
    clearChatHeader: () => { }
})