import { useState } from "react";
import './Employees.scss';

const EmployeeRow = ({ data }: { data: any }) => {
    return <>
        <div className="id-wrapper"><img src={data.profile_pic} />{data.id}</div>
        <div>{data.full_name}</div>
        <div>{data.login_id}</div>
        <div>{data.salary}</div>
        <div className="action-wrapper">
            <span>&#9998;</span>
            <span>&#10006;</span>
        </div>
    </>

}
const Employees: React.FC<{ employees: [] }> = ({ employees }: { employees: any[] }) => {
    console.log('employees', employees)
    return <div>
        <div className="title" >employee</div>
        <div>
            <div className="header" />
            <div className="body" >
                <div className="row-container header">
                    <div>id</div>
                    <div>Name</div>
                    <div>Login</div>
                    <div>Salary</div>
                    <div>Action</div>
                </div>
                {employees.map(row => {
                    return <div className="row-container body"><EmployeeRow data={row} /></div>
                })}
            </div>
        </div>
    </div>
}

export default Employees;