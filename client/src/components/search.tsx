import Autocomplete from '@mui/material/Autocomplete';
import { useFetch } from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';
import { TextField } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { ChangeEvent, useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';

interface Iuser {
    email: string
    name: string
    _id: string
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));


export const SeachInput = (props: any) => {
    const { request } = useFetch()
    const [text, setText] = useState<string | null>(null);
    const [user, setUser] = useState<Iuser | null>(null)
    const [users, setUsers] = useState<Iuser[]>([])
    const { sendMessage, getChats } = useContext(ChatContext)
    const auth = useContext(AuthContext)

    let navigate = useNavigate();

    const handleSearch = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value
        if (value) {
            const data = await request({
                url: '/api/search/users?' + new URLSearchParams({ search: event.currentTarget.value }),
                headers: {
                    Authorization: `Bearer ${auth.user ? auth.user.token : ''}`
                }
            })
            setUsers(data.users)
        }
    }

    const onChangeHandler = async (_: any, newValue: string | Iuser | null) => {
        console.log(newValue)
        if (newValue && typeof newValue !== 'string') {
            setUser(newValue)
            setText(newValue.name)
            const response = await sendMessage({
                withId: newValue._id
            })
            getChats()
            navigate(`:${response.chatId}`)
            console.log(response)
        }
    }

    return (
        <Search>
            <Autocomplete
                value={user}
                onChange={onChangeHandler}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={users}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Найди того самого"
                        InputProps={{
                            ...params.InputProps,
                            sx: { color: 'white' }
                        }}

                        sx={{ color: 'white' }}
                        onChange={handleSearch}
                    />
                )}
            />
        </Search>
    );
}