import { useEffect, useState } from "react";
import Employees from "../../components/employees/Employees";
import User from "../../components/user/User";
import { SERVERIP } from "../../setting/const";
import './Dashboard.scss';


const Dashboard: React.FC = () => {
    const [employeeData, setEmployeeData] = useState<any>();

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
            <Employees employees={employeeData || []} />
        </div>
    </div>
}

export default Dashboard;