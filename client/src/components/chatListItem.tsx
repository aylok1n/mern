import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { IChat } from "../interfases/chat";
import { Link, useParams } from "react-router-dom";

export const ChatItem = ({ chat }: { chat: IChat }) => {
    const selected = useParams()?.id?.substring(1) === chat.chatId
    const getDate = () => {
        const date = new Date(chat.lastMessage.date)
        const today = new Date()
        if (date.toDateString() === today.toDateString()) return date.toTimeString().split(' ')[0]
        return date.toLocaleDateString()
    }

    return (
        <Link to={`:${chat.chatId}`} className='relative w-full rounded-sm mr-5'>
            <ListItem>
                <ListItemButton selected={selected} >
                    <div className="flex flex-col flex-1">
                        <div className="flex flex-row items-start flex-1">
                            <ListItemIcon sx={{ width: '3rem', height: '3rem' }}>
                                <AccountCircle sx={{ width: '100%', height: '100%' }} />
                            </ListItemIcon>
                            <div className="flex flex-1 flex-col overflow-hidden">
                                <div className="flex flex-row items-center max-w-full">
                                    <span className="font-semibold">{chat.chatWith.name}</span>
                                    <div className="flex absolute right-0 transform -translate-x-full mr-6">
                                        <Typography
                                            variant={'body2'}
                                            component={'span'}
                                            align={'right'}
                                            sx={{ width: '100%' }}
                                        >
                                            {getDate()}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="overflow-hidden text-ellipsis w-9/12 ">
                                    <span className="whitespace-nowrap  overflow-hidden text-ellipsis   mr-2">
                                        {chat.lastMessage.text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ListItemButton>
            </ListItem >
        </Link>
    )
}