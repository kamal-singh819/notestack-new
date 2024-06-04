import { useState, useEffect } from "react";
import commonAxios from "../helper/CommonAxios";
const RequestsAvailable = () => {
    const [requests, setRequests] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    useEffect(() => {
        async function getAllRequests() {
            const response = await commonAxios({ method: 'get', url: "requests/get-all-requests", token: userInfo?.accessToken });
            if (response.status === 200) setRequests(response.data.data);
        }
        getAllRequests();
    }, []);
    return (
        <div className="sm:p-4 grid grid-cols-4">
            {requests.map(req => {
                return <div key={req._id} className="col-span-4 xl:col-span-2 border pt-8 sm:pt-2 border-white rounded-md p-2 relative text-[12px] sm:text-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-200">Name: </span>
                        <span className="text-white">{req.userId?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-200">Email: </span>
                        <span className="text-white">{req.userId?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-200">Type: </span>
                        <span className="text-white">{req.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-200">Message: </span>
                        <span className="text-white">{req.message}</span>
                    </div>
                    <div className="absolute right-2 top-2 flex items-center justify-end md:justify-center gap-2">
                        <button className="border border-white rounded-2xl px-4 py-[2px] text-green-500 bg-slate-100 hover:bg-white">Allow</button>
                        <button className="border border-white rounded-2xl px-4 py-[2px] text-red-500 bg-slate-100 hover:bg-white" >Block</button>
                    </div>
                </div>
            })}
        </div>
    )
}

export default RequestsAvailable;
