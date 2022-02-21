import { List } from "@mui/material";
import { ChatItem } from "../components/chatListItem";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { Chat } from "../components/chat";

export const ChatsPage = () => {
    const { chats, openChat } = useContext(ChatContext)

    return (
        <div className="w-full bg-white  p-5 h-full max-w-screen-xl flex flex-row">
            <List className="max-w-96 h-full  border-r-2 border-gray-300  ">
                {chats.map((chat, index) => <ChatItem key={index} openChat={openChat} chat={chat} />)}
            </List>
            <Chat />
        </div>
    )
} 