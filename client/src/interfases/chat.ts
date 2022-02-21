export type message = {
    date: string
    senderId: string
    text: string
    _id: string
}

export interface IChat {
    chatId: string
    chatWith: {
        name: string
        _id: string
    }
    lastMessage: message
    messages: message[]
}