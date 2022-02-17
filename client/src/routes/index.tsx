import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthPage } from './auth'

export const useRoutes = (isAuthenticated: boolean) => {

    if (isAuthenticated) {
        return (
            <div>вы залогинены</div>
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