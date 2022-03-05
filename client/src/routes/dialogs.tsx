import { Container, Drawer, IconButton, List } from "@mui/material";
import { ChatItem } from "../components/chatListItem";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Outlet } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export const ChatsPage = () => {
    const { chats, chatWith } = useContext(ChatContext)
    const [anchor, setAnchor] = useState<EventTarget | null>(null)

    const toggleDrawer = (event: React.MouseEvent<HTMLButtonElement>, reason?: "backdropClick" | "escapeKeyDown") => {
        if (reason) setAnchor(null)
        else setAnchor(event.currentTarget)
    };

    return (
        <div className="w-full bg-white rounded h-full max-w-screen-xl flex flex-row">
            <List
                className="scroll flex h-full bg-white border-r-4 border-gray-100 z-50"
                sx={{
                    display: {
                        xs: chatWith ? 'none' : 'block',
                        lg: 'block'
                    },
                    width: {
                        xs: '100vw',
                        lg: '30%'
                    },
                }}
            >
                {chats.map((chat, index) => <ChatItem key={index} chat={chat} />)}
            </List>
            <div className="w-full relative">
                {chatWith?.name &&
                    <div className={'border-b-4 bg-white w-full border-gray-100 flex absolute items-center justify-start py-2 px-5'}>
                        <IconButton
                            onClick={toggleDrawer}
                            sx={{ display: { xs: 'block', lg: 'none' }, position: 'absolute', left: 10 }}
                        >
                            {!!chatWith?.name && <Menu />}
                        </IconButton>
                        <div className="w-12 h-12">
                            <AccountCircle sx={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="flex flex-col ml-2">
                            <div className="flex flex-row items-center">
                                <span className="text-black mr-20 font-semibold">{chatWith?.name}</span>
                            </div>
                            <div className="flex flex-row items-center">
                                <span className="text-sm text-gray-400 truncate">
                                    Offline
                                </span>
                                <span className="text-sm text-gray-400 truncate ml-4">
                                    Last seen 2 days ago
                                </span>
                            </div>
                        </div>
                    </div>}
                <Drawer
                    sx={{ display: { xs: 'block', lg: 'none' } }}
                    role="presentation"
                    open={!!anchor}
                    onClose={toggleDrawer}
                >
                    {chats.map((chat, index) => <ChatItem key={index} chat={chat} />)}
                </Drawer >
                <Container disableGutters sx={{
                    display:
                    {
                        xs: chatWith ? 'flex' : 'none',
                        lg: 'flex'
                    },
                    maxHeight: '100%', 
                    padding: 0
                }}>
                    <Outlet />
                </Container>
            </div>
        </div >
    )
} 