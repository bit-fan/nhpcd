import { SERVERIP } from "../setting/const";

export const fetchEmployeeData = async () => {
    const data = await fetch(`${SERVERIP}/employees`)
        .then(d => d.json())
        .then(data => {
            return data;
        });
    return data;
}