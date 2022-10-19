import { useState } from "react";
import { IEmployeeTable, IEmployeeTableColumns } from "../../pages/dashboard/Dashboard";
import { deleteEmployeeData, editEmployeeData, IEmployeeData } from "../../services/employee";
import { EmployeeModalDelete } from "../employeeModals/EmployeeModalDelete";
import { EmployeeModalEdit } from "../employeeModals/EmployeeModalEdit";
import './Employees.scss';


const Employees: React.FC<{
    employees: IEmployeeData[],
    tableProp: IEmployeeTable,
    update: (key: IEmployeeTable) => void,
    onEmployeeDataChange: () => void
}> = ({ employees, tableProp, update, onEmployeeDataChange }) => {
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeData | undefined>(undefined);
    const [showModal, setShowModal] = useState<string | undefined>('');
    const updateCheck = (sortCol: IEmployeeTableColumns) => {
        if (sortCol === tableProp.sortBy) {
            update({ ...tableProp, order: tableProp.order === 1 ? -1 : 1 });
        } else {
            update({ ...tableProp, sortBy: sortCol });
        }
    }
    const HeaderCol = ({ title, colKey }: { title: string, colKey: IEmployeeTableColumns }) => {
        return <div>
            <div onClick={() => { updateCheck(colKey) }} data-testid={`table-sort-col-${title}`}>{title}
                {/* downarrow */}
                {colKey === tableProp.sortBy && tableProp.order === 1 && <span className="icon-sort">&#8595;</span>}
                {/* up arrow */}
                {colKey === tableProp.sortBy && tableProp.order === -1 && <span className="icon-sort">&#8593;</span>}
            </div>
        </div>
    }
    const EmployeeRow = ({ data }: { data: IEmployeeData }) => {
        return <>
            <div className="id-wrapper"><img src={data.profile_pic} alt='user profile img' />{data.id}</div>
            <div>{data.full_name}</div>
            <div>{data.login_id}</div>
            <div>{data.salary}</div>
            <div className="action-wrapper">
                <span data-testid='employee-row-icon-edit' onClick={() => { setShowModal('edit'); setSelectedEmployee(data) }}>&#9998;</span>
                <span data-testid='employee-row-icon-delete' onClick={() => { setShowModal('delete'); setSelectedEmployee(data) }}>&#10006;</span>
            </div>
        </>
    }

    const submitEditRequest = async (a: IEmployeeData) => {
        const { status } = await editEmployeeData(a);
        if (status === 'ok') {
            // successfully edited, close modal and update employee data
            setSelectedEmployee(undefined);
            setShowModal(undefined);
            onEmployeeDataChange();
        } else {

        }
    }
    const submitDeleteRequest = async (a: IEmployeeData) => {
        const { status } = await deleteEmployeeData(a);
        if (status === 'ok') {
            // successfully deleted, close modal and update employee data
            setSelectedEmployee(undefined);
            setShowModal(undefined);
            onEmployeeDataChange();
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

