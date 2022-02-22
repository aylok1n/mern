import { useState, useCallback, useEffect } from 'react'
import { IUserData } from '../interfases/auth'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null)
    const [ready, setReady] = useState(false)
    const [user, setUser] = useState<IUserData | null>(null)

    const login = useCallback((userData: IUserData) => {
        setToken(userData.token)
        setUser(userData)
        localStorage.setItem(storageName, JSON.stringify({
            ...userData
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUser(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const storeData = localStorage.getItem(storageName)
        if (storeData) {
            const data = JSON.parse(storeData)

            if (data && data.token) {
                login(data)
            }

            setReady(true)
        }

    }, [login])

    return { login, logout, token, ready, user, isAuthenticated: !!token }
}