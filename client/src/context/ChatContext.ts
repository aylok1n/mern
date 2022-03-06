import { createContext } from "react";
import { Socket } from "socket.io-client";
import { IChat, ISendMessageBody, message } from "../interfases/chat";

interface IChatContext {
    chats: IChat[]
    getChats: () => void
    sendMessage: (body: ISendMessageBody) => Promise<any>
    messages: message[]
    getChatMessages: (chatId: string) => void
    chatWith: IChat['chatWith'] | null
    clearChatHeader: () => void,
    socket: Socket | null
}

export const ChatContext = createContext<IChatContext>({
    chats: [],
    getChats: () => { },
    sendMessage: async (body: ISendMessageBody) => { },
    messages: [],
    getChatMessages: (chatId) => { },
    chatWith: null,
    clearChatHeader: () => { },
    socket: null
})