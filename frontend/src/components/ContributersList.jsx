import { useEffect, useState } from "react";
import commonAxios from "../helper/CommonAxios";
const ContributersList = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        const response = await commonAxios({ method: 'get', url: 'users/get-contributers' });
    }, []);
    return (
        <div></div>
    )
}
export default ContributersList;