import { useEffect, useState } from "react";
import commonAxios from "../helper/CommonAxios";
const ContributersList = () => {
    const [list, setList] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    useEffect(() => {
        async function getAllUserDetails() {
            const response = await commonAxios({ method: 'get', url: 'users/get-all-users', token: userInfo?.accessToken });
            setList(response.data.data);
        }
        getAllUserDetails();
    }, []);
    return (
        <div>
            {list.map(ele => <div className="flex gap-2 text-white" key={ele._id}>
                <span className="w-1/2 ">{ele.email}</span>
                <span className="w-1/2 border-s-2 ps-4 border-s-white">{ele.role}</span>
            </div>)}
        </div>
    )
}
export default ContributersList;