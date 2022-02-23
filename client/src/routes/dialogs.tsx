import { List } from "@mui/material";
import { ChatItem } from "../components/chatListItem";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Outlet } from "react-router-dom";

export const ChatsPage = () => {
    const { chats } = useContext(ChatContext)

    return (
        <div className="w-full bg-white p-5 pr-1 h-full max-w-screen-xl flex flex-row">
            {chats.length !== 0 &&
                <List className="w-5/12 scroll h-full border-r-2 border-gray-300  ">
                    {chats.map((chat, index) => <ChatItem key={index} chat={chat} />)}
                </List>
            }
            <Outlet />
        </div>
    )
} 