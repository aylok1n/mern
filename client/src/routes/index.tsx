import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { AuthPage } from './auth'
import PrimarySearchAppBar from "../components/appBar"
import { ChatsPage } from "./chat"
import { ProfilePage } from "./profile"

const Layout = () => {
    return (
        <div className='max-h-screen h-screen bg-slate-100 ' >
            <PrimarySearchAppBar />
            <div className='main-view'>
                <Outlet />
            </div>
        </div>
    )
}

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="chat" element={<ChatsPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                        </Route>
                        <Route path='*' element={<Navigate to="/chat" />} />
                    </Routes>
                </Router>
            </div>
        )
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
            </Routes>
        </Router>
    )
}