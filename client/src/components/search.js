import * as React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useFetch } from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';
import { TextField } from '@mui/material';

const filter = createFilterOptions();

const StyledTextField = styled(TextField)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function SeachInput(props) {
    const { request } = useFetch()

    const [value, setValue] = React.useState(null);
    const [users, setUsers] = React.useState([])
    const auth = React.useContext(AuthContext)

    const handleSearch = async (event) => {
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

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                console.log(newValue);
                setValue(newValue)
            }}
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
                    label="Найди того самого"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }}
                    onChange={handleSearch}
                />
            )}
        />
    );
}