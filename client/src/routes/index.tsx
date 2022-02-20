import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { AuthPage } from './auth'
import PrimarySearchAppBar from "../components/appBar"
import { ChatPage } from "./chat"
import { ProfilePage } from "./profile"

const Layout = () => {
    return (
        <>
            <PrimarySearchAppBar />
            <div className='flex mt-2/6 items-center h-screen flex-col'>
                <Outlet />
            </div>
        </>
    )
}

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="chat" element={<ChatPage />} />
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