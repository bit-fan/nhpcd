import { useState } from 'react'
import { IEmployeeData } from '../../services/employee'
import { ModalBody, ModalFooter, ModalTitle } from './EmployeeModal'
import './EmployeeModalEdit.scss'

export const EmployeeModalEdit: React.FC<{ employeeInfo: IEmployeeData, onCancel: () => void, onUpdate: (arg0: IEmployeeData) => void }> = ({ employeeInfo, onCancel, onUpdate }) => {
    const [name, setName] = useState<string>(employeeInfo.full_name);
    const [loginName, setLoginName] = useState<string>(employeeInfo.login_id);
    const [salary, setSalary] = useState<number>(employeeInfo.salary);
    if (!employeeInfo) {
        return <></>
    }

    return <div className="modal-employee">
        <ModalTitle title="Edit" onClickClose={() => onCancel()} />
        <ModalBody title={`Employee ID ${employeeInfo.id}`}>
            <div>
                <label>Name</label>
                <input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label>Login</label>
                <input value={loginName} onChange={e => setLoginName(e.target.value)} />
            </div>
            <div>
                <label>Salary</label>
                <input value={salary} onChange={e => setSalary(Number(e.target.value))} />
            </div>
        </ModalBody>
        <ModalFooter>
            <button onClick={() => onCancel()} >cancel</button>
            <button onClick={() => onUpdate({
                id: employeeInfo.id,
                full_name: name,
                login_id: loginName,
                salary: Number(salary)
            })}>Update</button>
        </ModalFooter>

    </div>
}
