import { useState } from "react";
import { IEmployeeTable, IEmployeeTableColumns } from "../../pages/dashboard/Dashboard";
import { IEmployeeData } from "../../services/employee";
import './Employees.scss';

const EmployeeRow = ({ data }: { data: IEmployeeData }) => {
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
    tableProp: IEmployeeTable,
    update: (colKey: 'sortBy' | 'order', val: IEmployeeTableColumns | 1 | -1) => void
}> = ({ employees, tableProp, update }) => {
    console.log('employees', employees)
    const updateCheck = (sortCol: IEmployeeTableColumns) => {
        console.log('checking', sortCol, tableProp);
        if (sortCol === tableProp.sortBy) {
            update('order', tableProp.order == 1 ? -1 : 1);
        } else {
            update('sortBy', sortCol);
        }
    }
    const HeaderCol = ({ title, colKey }: { title: string, colKey: IEmployeeTableColumns }) => {
        return <div>
            <div onClick={() => { updateCheck(colKey) }}>{title}
                {/* downarrow */}
                {colKey === tableProp.sortBy && tableProp.order === 1 && <>&#8595;</>}
                {/* up arrow */}
                {colKey === tableProp.sortBy && tableProp.order === -1 && <>&#8593;</>}
            </div>
        </div>
    }
    return <div>
        <div className="title" >Employees</div>
        <div>
            <div className="header" />
            <div className="body" >
                <div className="row-container header">
                    <HeaderCol title='id' colKey={IEmployeeTableColumns.id} />
                    <HeaderCol title='Name' colKey={IEmployeeTableColumns.name} />
                    <HeaderCol title='Login' colKey={IEmployeeTableColumns.login} />
                    <HeaderCol title='Salary' colKey={IEmployeeTableColumns.salary} />
                    <div>Action</div>
                </div>
                {employees.map((row: any) => {
                    return <div className="row-container body" key={row.id}><EmployeeRow data={row} /></div>
                })}
            </div>
        </div>
    </div>
}

export default Employees;