import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { IChat } from "../interfases/chat";

export const ChatItem = ({ chat, openChat }: { chat: IChat, openChat: (chat: IChat) => void }) => {

    const getDate = () => {
        const date = new Date(chat.lastMessage.date)
        const today = new Date()
        if (date.toDateString() === today.toDateString()) return date.toTimeString().split(' ')[0]
        return date.toLocaleDateString()
    }

    const ClickHandler = () => {
        openChat(chat)
    }

    return (
        <ListItem sx={{ w: '18rem', position: 'relative' }}>
            <ListItemButton onClick={ClickHandler}>
                <ListItemIcon sx={{ w: '3rem' }}>
                    <AccountCircle />
                </ListItemIcon>
                <ListItemText sx={{ minWidth: '10rem' }} primary={chat.chatWith.name} secondary={chat.lastMessage.text} />
                <Typography variant={'body2'} component={'span'} sx={{ w: '3rem' }} >
                    {getDate()}
                </Typography>
            </ListItemButton>
        </ListItem >
    )
}