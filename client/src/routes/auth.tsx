import { useOldState } from "../hooks/useOldState";
import { useFetch } from "../hooks/useFetch";
import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";

export const AuthPage = () => {
    const [form, setForm] = useOldState({
        email: '',
        name: '',
        password: ''
    })

    const { request, loader, error } = useFetch()

    const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    useEffect(() => {
        console.error(error) // сделать алерт
    }, [error])

    const requestFetch = async () => {
        const data = await request({
            url: '/api/auth/register',
            body: form,
            method: 'POST'
        })
        console.log(data)

    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col w-54 gap-y-3">
                <TextField value={form.email} id="standard-basic" name="email" label="Email" onChange={setInput} variant="standard" />
                <TextField value={form.name} id="standard-basic" name="name" label="Name" onChange={setInput} variant="standard" />
                <TextField value={form.password} id="standard-basic" name="password" label="Password" onChange={setInput} variant="standard" />
                <Button disabled={loader} onClick={requestFetch} variant="contained">Зарегайся</Button>
            </div>
        </div>
    )
}