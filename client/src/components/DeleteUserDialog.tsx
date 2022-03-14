import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {DefaultService} from "../services/openapi";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteUserDialog = (props:any)  => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(false);
        DefaultService.usersControllerRemove(props.id)
            .then( (u: any) => window.location.href = '/consents' );
    };

    return (
        <span>
            <DeleteIcon style={{cursor:"pointer"}} onClick={handleClickOpen}/>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Do you really want to delete user and all his/her events?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        First Name: {props.firstName}<br/>
                        Last Name: {props.lastName}<br/>
                        Email: {props.email}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    );
}