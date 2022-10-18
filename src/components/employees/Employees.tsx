import { useState } from "react";
import { IEmployeeTable, IEmployeeTableColumns } from "../../pages/dashboard/Dashboard";
import { deleteEmployeeData, editEmployeeData, IEmployeeData } from "../../services/employee";
import { EmployeeModalDelete } from "../modals/EmployeeModalDelete";
import { EmployeeModalEdit } from "../modals/EmployeeModalEdit";
import './Employees.scss';


const Employees: React.FC<{
    employees: [],
    tableProp: IEmployeeTable,
    update: (colKey: 'sortBy' | 'order', val: IEmployeeTableColumns | 1 | -1) => void
    onEmployeeDataChange: () => void
}> = ({ employees, tableProp, update, onEmployeeDataChange }) => {
    console.log('employees', employees)

    const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeData | undefined>(undefined);
    const [showModal, setShowModal] = useState<string | undefined>('');
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
    const EmployeeRow = ({ data }: { data: IEmployeeData }) => {
        return <>
            <div className="id-wrapper"><img src={data.profile_pic} />{data.id}</div>
            <div>{data.full_name}</div>
            <div>{data.login_id}</div>
            <div>{data.salary}</div>
            <div className="action-wrapper">
                <span onClick={() => { setShowModal('edit'); setSelectedEmployee(data) }}>&#9998;</span>
                <span onClick={() => { setShowModal('delete'); setSelectedEmployee(data) }}>&#10006;</span>
            </div>
        </>
    }

    const submitEditRequest = async (a: IEmployeeData) => {
        const { status, data } = await editEmployeeData(a);
        if (status === 'ok') {
            // successfully edited, close modal and update employee data
            setSelectedEmployee(undefined);
            setShowModal(undefined);
            onEmployeeDataChange();
            console.log('edit done', data);
        } else {

        }
    }
    const submitDeleteRequest = async (a: IEmployeeData) => {
        const { status, data } = await deleteEmployeeData(a);
        if (status === 'ok') {
            // successfully deleted, close modal and update employee data
            setSelectedEmployee(undefined);
            setShowModal(undefined);
            onEmployeeDataChange();
            console.log('del done', data);
        } else {

        }
    }
    return <div>
        {showModal === 'edit' && selectedEmployee &&
            <EmployeeModalEdit
                employeeInfo={selectedEmployee}
                onCancel={() => setSelectedEmployee(undefined)}
                onUpdate={(a) => {
                    submitEditRequest(a);
                }}
            />}
        {showModal === 'delete' && selectedEmployee &&
            <EmployeeModalDelete
                employeeInfo={selectedEmployee}
                onCancel={() => setSelectedEmployee(undefined)}
                onDelete={(a) => {
                    submitDeleteRequest(a)
                }} />}

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

