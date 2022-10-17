import { SERVERIP } from "../setting/const";

export type IEmployeeData = {
    id: number,
    full_name: string,
    salary: number,
    login_id: string,
    profile_pic?: string
}
const sampleData: IEmployeeData[] = [
    { id: 1, full_name: 'abc1', salary: 12341, login_id: 'abcid1' },
    { id: 2, full_name: 'abc2', salary: 12342, login_id: 'abcid2' },
    { id: 3, full_name: 'abc3', salary: 12343, login_id: 'abcid3' },
    { id: 4, full_name: 'abc4', salary: 12344, login_id: 'abcid4' },
    { id: 5, full_name: 'abc5', salary: 12345, login_id: 'abcid5' },
    { id: 6, full_name: 'abc6', salary: 12346, login_id: 'abcid6' },
    { id: 7, full_name: 'abc7', salary: 12347, login_id: 'abcid7' },
    { id: 8, full_name: 'abc8', salary: 12348, login_id: 'abcid8' }
];

export const fetchEmployeeData = async () => {
    // const data = await fetch(`${SERVERIP}/employees`)
    //     .then(d => d.json())
    //     .then(data => {
    //         return data;
    //     });
    // return data;
    return Promise.resolve(sampleData);
}