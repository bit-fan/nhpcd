import { useEffect, useState } from "react";
import Employees from "../../components/employees/Employees";
import PagingBox from "../../components/pagination-box/Pagination";
import User from "../../components/user/User";
import { fetchEmployeeData, IEmployeeData } from "../../services/employee";
import { DEFAULT_PAGE_SIZE } from "../../setting/const";
import './Dashboard.scss';

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
    const [tableProp, setTableProp] = useState<IEmployeeTable>(defaultTableProp);
    const updateTablePaging = (key: 'curPage' | 'pageSize', val: number) => {
        console.log('to change', key, val);
        if (key === 'curPage') {
            setTableProp(p => {
                return {
                    ...p,
                    curPage: val
                }
            })
        } else if (key === 'pageSize') {
            setTableProp(p => {
                return {
                    ...p,
                    pageSize: val,
                    curPage: 1// when page size changed, restore to first page
                }
            })
        }
    }
    const updateTableFiltering = (key: 'sortBy' | 'order', val: IEmployeeTableColumns | number) => {
        if (key === 'sortBy') {
            setTableProp((p: any) => {
                return {
                    ...p,
                    sortBy: val,
                }
            })
        } else if (key === 'order') {
            setTableProp((p: any) => {
                return {
                    ...p,
                    order: val,
                }
            })
        }
    }
    const updateEmployeeForShow = () => {
        console.log('new prop', tableProp);
        const startIdx = tableProp.pageSize * (tableProp.curPage - 1);
        const endIdx = tableProp.pageSize * tableProp.curPage;
        const showEmp = employeeData.sort((a: IEmployeeData, b: IEmployeeData) => {
            if (a[tableProp.sortBy] > b[tableProp.sortBy]) {
                return -tableProp.order;
            } else if (a[tableProp.sortBy] < b[tableProp.sortBy]) {
                return tableProp.order;
            } else return 0;
        }).slice(startIdx, endIdx);
        setEmployeeForDisply(showEmp);
    }
    const getEmployeeData = async () => {
        const data = await fetchEmployeeData();
        setEmployeeData(data);
    }
    useEffect(() => {
        getEmployeeData();
    }, [])

    useEffect(() => {
        updateEmployeeForShow()
    }, [employeeData, tableProp])
    return <div className="dashboard-container">
        <User />
        <div className="employee-wrapper">
            <PagingBox
                total={employeeData.length}
                tableProp={tableProp}
                update={(key, val) => updateTablePaging(key, val)} />
            <Employees
                employees={employeeForDisplay}
                tableProp={tableProp}
                update={(key, val) => updateTableFiltering(key, val)} />
            <PagingBox
                total={employeeData.length}
                tableProp={tableProp}
                update={(key, val) => updateTablePaging(key, val)} />
        </div>
    </div>
}

export default Dashboard;