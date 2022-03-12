import {ApiError, CreateUserDto, DefaultService, OpenAPI} from "../services/openapi";
import {useCallback, useState} from "react";
import {SubmitHandler, useController, UseControllerProps, useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import * as React from "react";

type FormValues = {
    FirstName: string;
    LastName: string;
    Email: string;
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
            FirstName: "John", LastName: "Doe", Email: "test@test.com"
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
        // console.log(data);
        const user:CreateUserDto = {email:data.Email, firstName: data.FirstName, lastName: data.LastName, consents: []};
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
                I agree to:
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