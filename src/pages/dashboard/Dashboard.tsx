import { useEffect, useState } from "react";
import Employees from "../../components/employees/Employees";
import PagingBox from "../../components/pagination-box/Pagination";
import User from "../../components/user/User";
import { DEFAULT_PAGE_SIZE, SERVERIP } from "../../setting/const";
import './Dashboard.scss';


const Dashboard: React.FC = () => {
    const [employeeData, setEmployeeData] = useState<any>([]);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState(0);
    const updatePage = (key: 'page' | 'size', val: number) => {
        console.log('to change', key, val);
        if (key === 'page') {
            setCurrentPage(val);
        } else if (key === 'size') {
            setPageSize(val);
            setCurrentPage(1); // when page size changed, restore to first page
        }
    }
    const getEmployeeData = async () => {
        const data = await fetch(`${SERVERIP}/employees`)
            .then(d => d.json())
            .then(data => {
                return data;
            });
        setEmployeeData(data);
    }
    useEffect(() => {
        getEmployeeData();
    }, [])
    return <div className="dashboard-container">
        <User />
        <div className="employee-wrapper">
            <PagingBox
                total={employeeData.length}
                pageSize={pageSize}
                curPage={currentPage}
                update={(key, val) => updatePage(key, val)} />
            <Employees employees={employeeData.slice(pageSize * (currentPage - 1), pageSize * currentPage)} />
            <PagingBox
                total={employeeData.length}
                pageSize={pageSize}
                curPage={currentPage}
                update={(key, val) => updatePage(key, val)} />
        </div>
    </div>
}

export default Dashboard;