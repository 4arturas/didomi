import {ApiError, CreateUserDto, DefaultService, OpenAPI} from "../services/openapi";
import useApi from "../hooks/useApi";
import {useCallback, useEffect, useState} from "react";
import EnhancedTable from "./EnhancedTable";

// const [users, setUsers] = useState<any[]>([]);
// const [error, setError] = useState<ApiError|null>();

// DefaultService.appControllerGetHello().then(r=>console.log(r) );

// OpenAPI.BASE = 'http://localhost:4000';

// DefaultService.usersControllerFindAll().then(r=>console.log(r) );




function Consents() {

    const [users, setUsers] = useState([]);

    OpenAPI.BASE = 'http://localhost:4000';

    const handleRequest = useCallback(async function <T>(request: Promise<T>) {

        // setIsloading(true)
        try {
            const response = await request
            // setError(undefined)
            return response
        } catch (error: any) {
            // setError(error)
        } finally {
            // setIsloading(true)
        }
    }, [])

    useEffect(()=> {
        // useApi().handleRequest(DefaultService.usersControllerFindAll()).then( u => setUsers(u) );
        // handleRequest(DefaultService.usersControllerFindAll()).then( u => setUsers(u) );
    }, []);

    return (
        <div>
            <h1>Consents</h1>
            <EnhancedTable/>
        </div>
    );
}

export default Consents;