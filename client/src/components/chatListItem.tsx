import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { IChat } from "../interfases/chat";
import { Link, useParams } from "react-router-dom";

export const ChatItem = ({ chat }: { chat: IChat }) => {
    const selected = useParams()?.id?.substring(1) === chat.chatId
    const getDate = () => {
        if (!chat?.lastMessage?.date) return ''
        const date = new Date(chat.lastMessage.date)
        const today = new Date()
        if (date.toDateString() === today.toDateString()) return date.toTimeString().split(' ')[0]
        return date.toLocaleDateString()
    }

    return (
        <Link to={`:${chat.chatId}`} className='rounded-sm'>
            <ListItem sx={{ py: 0.5 }}>
                <div className={`flex justify-between relative overflow-hidden bg-blue-100 p-2 items-center shadow-lg rounded cursor-pointer transition hover:bg-stone-100`}>
                    {selected &&
                        <div
                            className="h-full absolute left-0 w-1 bg-emerald-500 z-50"
                            style={{ boxShadow: '10px 0px 7px -5px rgba(0, 182, 13, 0.4)' }}
                        >
                        </div>
                    }
                    <div className="flex relative z-20">
                        <span className="text-black-300 text-sm absolute right-0 top-1">{getDate()}</span>
                        <div className="w-12 h-12">
                            <AccountCircle sx={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center">
                                <span className="text-black mr-20 font-semibold">{chat.chatWith?.name}</span>
                            </div>
                            <span className="text-sm text-gray-400 truncate w-48">
                                {chat?.lastMessage?.text}
                            </span>
                        </div>
                    </div>
                </div>
            </ListItem >
        </Link>
    )
}