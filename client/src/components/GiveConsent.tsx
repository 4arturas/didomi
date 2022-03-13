import {ApiError, CreateUserDto, DefaultService, OpenAPI} from "../services/openapi";
import {useCallback, useState} from "react";
import {SubmitHandler, useController, UseControllerProps, Controller, useForm} from "react-hook-form";
import {Alert, Button, Checkbox, CircularProgress, FormControlLabel, TextField} from "@mui/material";
import * as React from "react";
import {ConsentsEnum} from "./ConsentsEnum";

type FormValues = {
    FirstName: string;
    LastName: string;
    Email: string;
    EmailNotifications: boolean;
    SmsNotifications: boolean;
};

function Input(props: UseControllerProps<FormValues>) {
    const { field, fieldState } = useController(props);

    return (
        <div>
            <TextField {...field} placeholder={props.name} variant="outlined" label={field.name}/>
            {/*<p>{fieldState.error && "error"}</p>*/}
        </div>
    );
}

function GiveConsent() {

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            // FirstName: "John", LastName: "Doe", Email: "test@test.com"
        },
        mode: "onChange"
    });

    const [error, setError] = useState<ApiError | null>(null);
    const [isLoading, setIsloading] = useState<boolean>(true);

    const handleRequest = useCallback(async function <T>(request: Promise<T>) {

        setIsloading(true);
        try {
            const response = await request;
            setError(null)
            return response;
        } catch (error: any) {
            setError(error);
        } finally {
            setIsloading(true);
        }
    }, []);

    const onSubmit = (data: FormValues) => {
        OpenAPI.BASE = 'http://localhost:4000';

        const user:CreateUserDto = {
            email:data.Email,
            firstName: data.FirstName,
            lastName: data.LastName,
            consents: [
                JSON.parse(`{"id":"${Object.keys(ConsentsEnum)[Object.values(ConsentsEnum).indexOf(ConsentsEnum.email_notifications)]}", "enabled": ${data.EmailNotifications}}`),
                JSON.parse(`{"id":"${Object.keys(ConsentsEnum)[Object.values(ConsentsEnum).indexOf(ConsentsEnum.sms_notifications)]}", "enabled": ${data.SmsNotifications}}`)
            ]
        };

        handleRequest(DefaultService.usersControllerCreate(user))
            .then( (u: any) => {
                console.log( u );
            } );

    }
    const onSubmitError: SubmitHandler<FormValues> = data => console.error(data);

    return (
        <div>
            <h1>Give Consent</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input control={control} name="FirstName" rules={{ required: true }} />
                {errors.FirstName && <Alert severity="error" style={{width:"170px"}}>This field is required</Alert>}
                <br/>
                <Input control={control} name="LastName" rules={{ required: true }} />
                {errors.LastName && <Alert severity="error" style={{width:"170px"}}>This field is required</Alert>}
                <br/>
                <Input control={control} name="Email" rules={{ required: true }} />
                {errors.Email && <Alert severity="error" style={{width:"170px"}}>This field is required</Alert>}
                <br/>

                I agree to:
                <br/>

                <Controller
                    name="EmailNotifications"
                    control={control}
                    defaultValue={false}
                    rules={{ required: false }}
                    render={({ field }) =>
                        <FormControlLabel control={<Checkbox {...field} />} label={ConsentsEnum.email_notifications}  value={Object.keys(ConsentsEnum)[Object.values(ConsentsEnum).indexOf(ConsentsEnum.email_notifications)]} />

                    }
                />
                <br/>
                <Controller
                    name="SmsNotifications"
                    control={control}
                    defaultValue={false}
                    rules={{ required: false }}
                    render={({ field }) =>
                        <FormControlLabel control={<Checkbox {...field}/>} label={ConsentsEnum.sms_notifications}  value={Object.keys(ConsentsEnum)[Object.values(ConsentsEnum).indexOf(ConsentsEnum.sms_notifications)]} />
                    }
                />
                <br/>
                <br/>
                {isLoading ? <Button type="submit" variant="outlined">Submit</Button> : <CircularProgress />}
                <br/><br/>
                {error?.message ? <div><Alert severity="error">{error?.message}</Alert><br/></div> : <></>}
                {error?.body.message ? error.body.message.map( (m:string) => <div><Alert severity="error">{m}</Alert></div>) : <></>}

            </form>
        </div>
    );
}

export default GiveConsent;