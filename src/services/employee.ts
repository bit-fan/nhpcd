import { sampleEmployeesData } from "../mocks/employees";
import { SERVERIP } from "../setting/const";

export type IEmployeeData = {
    id: number,
    full_name: string,
    salary: number,
    login_id: string,
    profile_pic?: string
}

export const fetchEmployeeData = async () => {

    // this is to avoid limited free API calls available in beeceptor

    // const data = await fetch(`${SERVERIP}/employees`)
    //     .then(d => d.json())
    //     .then(data => {
    //         return data;
    //     });
    // return data;
    return Promise.resolve({ status: 'ok', data: sampleEmployeesData });
}

export const editEmployeeData = async (params: IEmployeeData) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    const response = await fetch(`${SERVERIP}/employees/${params.id}`, requestOptions)
        .then(d => d.json())
        .then(data => {
            return data;
        }).catch(error => {
            console.error('There was an edit error!', error);
        });
    // returned status should be updated according to API response
    return { status: 'ok', data: response };
}

export const deleteEmployeeData = async (params: IEmployeeData) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    const response = await fetch(`${SERVERIP}/employees/${params.id}`, requestOptions)
        .then(d => d.json())
        .then(data => {
            return data;
        }).catch(error => {
            console.error('There was a delete error!', error);
        });;

    // sample response:
    // { "status": "ok", "message":"employee deleted successfully"}
    // returned status should be updated according to API response
    return { status: 'ok', data: response };
}

export const uploadEmployeeData = async (formData: FormData) => {
    const response = await fetch(
        `${SERVERIP}/employees/upload`,
        {
            method: 'POST',
            body: formData,
        }
    )
        .then((r) => r.json())
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    // returned status should be updated according to API response
    return { status: 'ok', data: 'dummy data' };
}