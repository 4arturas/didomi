import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {CreateEventDto, DefaultService, UpdateEventDto} from "../services/openapi";
import EditIcon from "@mui/icons-material/Edit";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {ConsentsEnum} from "./ConsentsEnum";

const UpdateUserDialog = (props:any)  => {
    const [emailNotifications, setEmailNotifications] = React.useState<boolean>(false);
    const [smsNotifications, setSmsNotifications] = React.useState<boolean>(false);

    const [open, setOpen] = React.useState<boolean>(false);
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
        const ee: any = {eventId:'3c2d1d92-8b44-4cdc-9940-9770eed3289', enabled:true}

        DefaultService.eventsControllerUpdate(ee.eventId, ee);

        // props.user.consents.forEach( (e:UpdateEventDto,index:number) => {
        //     console.log( e );
        //     e.enabled = (e.id === Object.keys(ConsentsEnum)[Object.values(ConsentsEnum).indexOf(ConsentsEnum.email_notifications)]) ? emailNotifications : smsNotifications;
        //     DefaultService.eventsControllerUpdate(e.eventId, e);
        // } );
        // window.location.href = '/consents'
        // DefaultService.eventsControllerUpdate(id, )
        // DefaultService.usersControllerRemove(props.id)
        //     .then( (u: any) => window.location.href = '/consents' );
    };

    React.useEffect( () => {
        for (let i = 0; i < props.user.consents.length; i++) {
            const e:CreateEventDto = props.user.consents[i];
            if (e.id === Object.keys(ConsentsEnum)[Object.values(ConsentsEnum).indexOf(ConsentsEnum.email_notifications)])
                setEmailNotifications(e.enabled);
            else
                setSmsNotifications(e.enabled);
        }
    }, []);

    return (
        <>
            <EditIcon style={{cursor:"pointer"}} onClick={handleClickOpen}/>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Update user's consents"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        First name: {props.user.firstName}<br/>
                        Last name: {props.user.lastName}<br/>
                        Email: {props.user.email}
                        <br/>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={emailNotifications} onClick={()=>setEmailNotifications(!emailNotifications)}/>} label={ConsentsEnum.email_notifications}  value={Object.keys(ConsentsEnum)[Object.values(ConsentsEnum).indexOf(ConsentsEnum.email_notifications)]} />
                            <FormControlLabel control={<Checkbox checked={smsNotifications}/>} onClick={()=>setSmsNotifications(!smsNotifications)} label={ConsentsEnum.sms_notifications}  value={Object.keys(ConsentsEnum)[Object.values(ConsentsEnum).indexOf(ConsentsEnum.sms_notifications)]} />
                        </FormGroup>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} autoFocus>
                        Update consents
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UpdateUserDialog;