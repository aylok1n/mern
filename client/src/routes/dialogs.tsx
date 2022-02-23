import { List } from "@mui/material";
import { ChatItem } from "../components/chatListItem";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Outlet } from "react-router-dom";
import target from '../img/target.gif'

export const ChatsPage = () => {
    const { chats } = useContext(ChatContext)

    return (
        <div className="w-full bg-white  p-5 h-full max-w-screen-xl flex flex-row">
            {chats.length != 0 &&
                <List className="max-w-96 h-full  border-r-2 border-gray-300  ">
                    {chats.map((chat, index) => <ChatItem key={index} chat={chat} />)}
                </List>
            }
            {<Outlet /> || <div className="flex flex-col justify-center items-center h-full w-full">
                <div className="w-36">
                    <img src={target} />
                </div>
                <p>Чат-то откройте...</p>
            </div>}
        </div>
    )
} 