import React from "react";
import { useOldState } from "../hooks/useOldState";

export const AuthPage = () => {
    const [form, setForm] = useOldState({
        email: '',
        name: '',
        password: ''
    })

    return (
        <div>
            123123
        </div>
    )
}