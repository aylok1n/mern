import { Container, Drawer, IconButton, List } from "@mui/material";
import { ChatItem } from "../components/chatListItem";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Outlet } from "react-router-dom";
import { Menu } from "@mui/icons-material";

export const ChatsPage = () => {
    const { chats, chatWith } = useContext(ChatContext)
    const [anchor, setAnchor] = useState<EventTarget | null>(null)

    const toggleDrawer = (event: React.MouseEvent<HTMLButtonElement>, reason?: "backdropClick" | "escapeKeyDown") => {
        if (reason) setAnchor(null)
        else setAnchor(event.currentTarget)
    };

    return (
        <div className="w-full bg-white pr-1 rounded border border-gray-100 h-full max-w-screen-xl flex flex-row">
            <List
                className="scroll flex h-full  border-gray-100"
                sx={{
                    display: {
                        xs: chatWith ? 'none' : 'block',
                        lg: 'block'
                    },
                    width: {
                        xs: '100vw',
                        lg: '30%'
                    },
                    borderRight: {
                        xs: '',
                        md: '1px'
                    }
                }}
            >
                {chats.map((chat, index) => <ChatItem key={index} chat={chat} />)}
            </List>
            <div className="w-full relative">
                {chatWith?.name && <div className={'border-b bg-white w-full h-16 border-gray-300 flex absolute items-center justify-center'}>
                    <IconButton
                        onClick={toggleDrawer}
                        sx={{ display: { xs: 'block', lg: 'none' }, position: 'absolute', left: 10 }}
                    >
                        {!!chatWith?.name && <Menu />}
                    </IconButton>
                    <h3>{chatWith?.name}</h3>
                </div>}
                <Drawer
                    sx={{ display: { xs: 'block', lg: 'none' } }}
                    role="presentation"
                    open={!!anchor}
                    onClose={toggleDrawer}
                >
                    {chats.map((chat, index) => <ChatItem key={index} chat={chat} />)}
                </Drawer >
                <Container sx={{
                    display:
                    {
                        xs: chatWith ? 'flex' : 'none',
                        lg: 'flex'
                    },
                    maxHeight: '100%'
                }}>
                    <Outlet />
                </Container>
            </div>
        </div >
    )
} 