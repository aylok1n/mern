export interface IUserData {
    id: string
    name: string
    image: string
    email: string,
    token: string,
    desc: string
}

export interface IAuthContext {
    login: (user: IUserData) => void,
    logout: () => void,
    isAuthenticated: boolean,
    ready: boolean,
    user: IUserData  | null
}