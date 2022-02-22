import { createContext } from 'react'
import { IAuthContext, IUserData } from '../interfases/auth'

export const AuthContext = createContext<IAuthContext>({
    login: (userData: IUserData) => { },
    logout: () => { },
    isAuthenticated: false,
    user: null,
    ready: false
})