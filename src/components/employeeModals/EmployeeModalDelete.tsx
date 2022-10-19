import { IEmployeeData } from '../../services/employee'
import { ModalBody, ModalFooter, ModalTitle } from './EmployeeModal'
import './EmployeeModalDelete.scss'

export const EmployeeModalDelete: React.FC<{
    employeeInfo: IEmployeeData,
    onDelete: (a: IEmployeeData) => void,
    onCancel: () => void
}> = ({ employeeInfo, onCancel, onDelete }) => {
    return <div className="modal-employee">
        <ModalTitle title="Delete" onClickClose={() => onCancel()} />
        <ModalBody title={`Are you confirm to delete Employee ${employeeInfo.id} ?`}>
            <div>
                <label>Name</label>
                <label>{employeeInfo.full_name}</label>
            </div>
            <div>
                <label>Login</label>
                <label>{employeeInfo.login_id}</label>
            </div>
            <div>
                <label>Salary</label>
                <label>{employeeInfo.salary}</label>
            </div>
        </ModalBody>
        <ModalFooter>
            <button onClick={() => onCancel()}>Cancel</button>
            <button data-testid='modal-button-delete' onClick={() => onDelete(employeeInfo)}>Delete</button>
        </ModalFooter>

    </div>
}
