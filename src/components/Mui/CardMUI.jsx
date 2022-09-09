import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ButtonCard = ({children, ...props}) => {

    return (
        <Stack >
            <Button style={{width: '150px', height: '100px', marginBottom: '10px'}} {...props} variant="contained" color="success">
                {children}
            </Button>
        </Stack>
    );
}
export default ButtonCard