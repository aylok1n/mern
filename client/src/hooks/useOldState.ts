import { useState } from "react"

export const useOldState = <Type>(initialState: Type): [Type, (nextState: Type) => void] => {
    const [state, setState] = useState(initialState)

    const setOldState = (nextState: Type) => {
        setState({
            ...state, ...nextState
        })
    }

    return [state, setOldState]
}