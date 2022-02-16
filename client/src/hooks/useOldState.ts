import { useState } from "react"

export const useOldState = (initialState: Object) => {
    const [state, setState] = useState(initialState)

    const setOldState = (nextState: Object) => setState({
        ...state, ...nextState
    })

    return [state, setOldState]
}