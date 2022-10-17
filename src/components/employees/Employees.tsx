import { useState } from "react";
import { IEmployeeTableColumns } from "../../pages/dashboard/Dashboard";
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
const Employees: React.FC<{
    employees: [],
    update: (key: 'sortBy' | 'order', val: IEmployeeTableColumns) => void
}> = ({ employees, update }) => {
    console.log('employees', employees)
    return <div>
        <div className="title" >employee</div>
        <div>
            <div className="header" />
            <div className="body" >
                <div className="row-container header">
                    <div onClick={() => { update('sortBy', IEmployeeTableColumns.id) }}>id</div>
                    <div onClick={() => { update('sortBy', IEmployeeTableColumns.name) }}>Name</div>
                    <div onClick={() => { update('sortBy', IEmployeeTableColumns.login) }}>Login</div>
                    <div onClick={() => { update('sortBy', IEmployeeTableColumns.salary) }}>Salary</div>
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