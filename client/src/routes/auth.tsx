import { useOldState } from "../hooks/useOldState";
import { useFetch } from "../hooks/useFetch";
import { Button, TextField, Box, Tabs, Tab, Typography, Alert } from "@mui/material";
import PropTypes from 'prop-types';
import React, { useState } from "react";

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const AuthPage = () => {
    const [form, setForm] = useOldState({
        email: '',
        name: '',
        password: ''
    })
    const [tab, setTab] = useState(0)

    const { request, loader, error } = useFetch()

    const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const register = async () => {
        const data = await request({
            url: '/api/auth/register',
            body: form,
            method: 'POST'
        })
    }

    const auth = async () => {
        const data = await request({
            url: '/api/auth/login',
            body: form,
            method: 'POST'
        })
    }

    const changeTab = (event: React.SyntheticEvent<Element, Event>, value: any) => {
        setTab(value)
    };

    return (
        <>
            {!!error && <Alert severity='error' color='error'>
                {error}
            </Alert>}
            <div className="flex mt-2/6 items-center h-screen flex-col">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={changeTab} aria-label="basic tabs example">
                        <Tab label="Регистрация" {...a11yProps(0)} />
                        <Tab label="Авторизация" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={tab} index={0}>
                    <div className="flex flex-col w-54 gap-y-3">
                        <TextField value={form.email} id="standard-basic" name="email" label="Email" onChange={setInput} variant="standard" />
                        <TextField value={form.name} id="standard-basic" name="name" label="Name" onChange={setInput} variant="standard" />
                        <TextField value={form.password} id="standard-basic" name="password" label="Password" onChange={setInput} variant="standard" />
                        <Button disabled={loader} onClick={register} variant="contained">Зарегайся</Button>
                    </div>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <div className="flex flex-col w-54 gap-y-3">
                        <TextField value={form.email} id="standard-basic" name="email" label="Email" onChange={setInput} variant="standard" />
                        <TextField value={form.password} id="standard-basic" name="password" label="Password" onChange={setInput} variant="standard" />
                        <Button disabled={loader} onClick={auth} variant="contained">Захади</Button>
                    </div>
                </TabPanel>
            </div>
        </>

    )
}