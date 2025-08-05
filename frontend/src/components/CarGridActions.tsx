import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { CustomCellRendererProps } from 'ag-grid-react';
import { NavLink } from 'react-router';

interface ICarGridActionsParams {
    onDeleteClick: (id: number) => void;
}

export const CarGridActions = ({data, onDeleteClick}: CustomCellRendererProps<ICar> & ICarGridActionsParams) => {
    const handleDeleteClick = () => {
        if(data?.id) {
            onDeleteClick(data?.id)
        }
    }

    return (
        <Stack direction={'row'} spacing={2} justifyContent="center" alignContent="center">
            <Button variant="contained" size='small' color="primary">
                <NavLink to={`/${data?.id}`} style={{color: 'white', textDecoration: 'none'}}>
                    View
                </NavLink>
            </Button>
            <Button variant="contained" color="error" size='small' onClick={handleDeleteClick}>Delete</Button>
        </Stack>
    )
}