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
        <Link to={`/chat/:${chat.chatId}`} className='relative w-full rounded-sm mr-5'>
            <ListItem>
                <ListItemButton selected={selected} >
                    <ListItemIcon sx={{ w: '2rem' }}>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText
                        className="w-full"
                        primary={chat.chatWith.name}
                        secondary={chat.lastMessage.text}
                    />
                    <Typography
                        variant={'body2'}
                        component={'span'}
                        sx={{ w: '3rem' }}
                    >
                        {getDate()}
                    </Typography>
                </ListItemButton>
            </ListItem >
        </Link>
    )
}