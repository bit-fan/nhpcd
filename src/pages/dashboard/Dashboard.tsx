import { useEffect, useState } from "react";
import Employees from "../../components/employees/Employees";
import PagingBox from "../../components/pagination-box/Pagination";
import User from "../../components/user/User";
import { fetchEmployeeData, IEmployeeData } from "../../services/employee";
import { DEFAULT_PAGE_SIZE } from "../../setting/const";
import './Dashboard.scss';
import Filter, { IFilterValues } from "../../components/Filter/Filter";

export enum IEmployeeTableColumns {
    id = 'id',
    name = 'full_name',
    login = 'login_id',
    salary = 'salary',
};

export type IEmployeeTable = {
    curPage: number;
    pageSize: number;
    sortBy: IEmployeeTableColumns;
    order: -1 | 1
}

const defaultTableProp: IEmployeeTable = {
    curPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: IEmployeeTableColumns.id,
    order: -1
};

const Dashboard: React.FC = () => {
    const [employeeData, setEmployeeData] = useState<IEmployeeData[]>([]);
    const [employeeForDisplay, setEmployeeForDisply] = useState<any>([]);
    const [numFilteredEmployee, setNumFilteredEmployee] = useState<number>(0);
    const [tableProp, setTableProp] = useState<IEmployeeTable>(defaultTableProp);
    const [filterValues, setFilterValues] = useState<IFilterValues>();

    const getEmployeeData = async () => {
        const data = await fetchEmployeeData();
        setEmployeeData(data);
    }

    // fetch employee data when first launch
    useEffect(() => {
        getEmployeeData();
    }, [])

    useEffect(() => {
        const startIdx = tableProp.pageSize * (tableProp.curPage - 1);
        const endIdx = tableProp.pageSize * tableProp.curPage;
        // filter range first
        const filteredEmployee = employeeData
            .filter(emp => {
                if (filterValues?.lower && emp.salary < filterValues.lower) {
                    return false;
                }
                if (filterValues?.upper && emp.salary > filterValues.upper) {
                    return false;
                }
                return true;
            });
        setNumFilteredEmployee(filteredEmployee.length);


        // add sorting column and direction
        const showEmp = filteredEmployee
            .sort((a: IEmployeeData, b: IEmployeeData) => {
                if (a[tableProp.sortBy] > b[tableProp.sortBy]) {
                    return -tableProp.order;
                } else if (a[tableProp.sortBy] < b[tableProp.sortBy]) {
                    return tableProp.order;
                } else return 0;
            })
            // add paging
            .slice(startIdx, endIdx);
        setEmployeeForDisply(showEmp);
    }, [employeeData, tableProp, filterValues])
    //whenever source of employee change, sorting change, range change, table content should be updated

    return <div className="dashboard-container">
        <User />
        <div className="employee-wrapper">
            <Filter values={filterValues} updateValue={val => { setFilterValues(val) }} />
            <PagingBox
                total={numFilteredEmployee}
                tableProp={tableProp}
                update={(newTableProp: IEmployeeTable) => setTableProp(newTableProp)} />
            <Employees
                employees={employeeForDisplay}
                tableProp={tableProp}
                update={(newTableProp: IEmployeeTable) => setTableProp(newTableProp)}
                onEmployeeDataChange={() => { getEmployeeData() }} />
            <PagingBox
                total={numFilteredEmployee}
                tableProp={tableProp}
                update={(newTableProp: IEmployeeTable) => setTableProp(newTableProp)} />
        </div>
    </div>
}

export default Dashboard;