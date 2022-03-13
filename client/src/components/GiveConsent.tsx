import {ApiError, CreateUserDto, DefaultService, OpenAPI} from "../services/openapi";
import {useCallback, useState} from "react";
import {SubmitHandler, useController, UseControllerProps, useForm} from "react-hook-form";
import {Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import * as React from "react";
import {ConsentsEnum} from "./ConsentsEnum";

type FormValues = {
    FirstName: string;
    LastName: string;
    Email: string;
    email_notifications: boolean;
    sms_notifications: boolean;
};

function Input(props: UseControllerProps<FormValues>) {
    const { field, fieldState } = useController(props);

    return (
        <div>
            <TextField {...field} placeholder={props.name} />
            {/*<p>{fieldState.error && "error"}</p>*/}
        </div>
    );
}

function GiveConsent() {

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            FirstName: "John", LastName: "Doe", Email: "test@test.com", email_notifications: false, sms_notifications: false
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
                JSON.parse(`{"id":"email_notifications", "enabled": ${data.email_notifications}}`),
                JSON.parse(`{"id":"sms_notifications", "enabled": ${data.sms_notifications}}`)
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
                {errors.FirstName && <span>This field is required</span>}
                <Input control={control} name="LastName" rules={{ required: true }} />
                {errors.LastName && <span>This field is required</span>}
                <Input control={control} name="Email" rules={{ required: true }} />
                {errors.Email && <span>This field is required</span>}
                <br/>
                I agree to:
                <br/>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label={ConsentsEnum.email_notifications} value="email_notifications" />
                    <FormControlLabel control={<Checkbox />} label={ConsentsEnum.sms_notifications}  value="sms_notifications" />
                </FormGroup>
                <br/>
                <input type="submit" />
                <br/><br/>
                <div style={{color:'red'}}>
                {
                    error &&
                    error.body.message ?
                        error.body.message.map( (m:string) => <div>{m}</div>) :
                        <div>{error?.message}</div>
                }
                </div>
            </form>
        </div>
    );
}

export default GiveConsent;