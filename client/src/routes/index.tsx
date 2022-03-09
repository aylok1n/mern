import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { AuthPage } from './auth'
import PrimarySearchAppBar from "../components/appBar"
import { ChatsPage } from "./dialogs"
import { ProfilePage } from "./profile"
import { ChatContext } from '../context/ChatContext'
import { useChat } from '../hooks/useChat'
import { IAuthContext } from '../interfases/auth'
import { NoOpenChat, OpenChat } from './chat'
import { Meets } from './meets'

const Layout = () => {
    return (
        <div className='max-h-screen h-screen bg-slate-100'>
            <PrimarySearchAppBar />
            <div className='main-view'>
                <Outlet />
            </div>
        </div>
    )
}

export const useRoutes = (auth: IAuthContext) => {
    const chat = useChat(auth)
    if (auth.isAuthenticated) {
        return (
            <ChatContext.Provider value={chat}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Navigate to="/meets" />} />
                            <Route path="/chat" element={<ChatsPage />}>
                                <Route index element={<NoOpenChat />} />
                                <Route path=":id" element={<OpenChat />} />
                            </Route>
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="meets" element={<Meets />} />
                        </Route>
                        <Route path='*' element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </ChatContext.Provider>
        )
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}