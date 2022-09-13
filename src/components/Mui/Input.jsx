import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const InputUi = ({...props}) => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                        id="filled-basic"
                        variant="filled"
                        className='login__input'
                        {...props}
            />
        </Box>
    );
}
export default InputUi