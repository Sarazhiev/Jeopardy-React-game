import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ButtonCard = ({children, ...props}) => {

    return (
        <Stack >
            <Button  {...props} variant="contained" color="success">
                {children}
            </Button>
        </Stack>
    );
}
export default ButtonCard