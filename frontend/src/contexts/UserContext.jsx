import { createContext, useContext, useState, useEffect } from "react";
import commonAxios from "../helper/CommonAxios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [profileData, setProfileData] = useState(null);
    useEffect(() => {
        async function getUserDetailsApi() {
            const response = await commonAxios({ method: 'get', url: `users/get-user/?userId=${userInfo?.userId}`, token: userInfo?.accessToken });
            if (response.status === 200) setProfileData(response.data.data);
        }
        getUserDetailsApi();
    }, []);
    return (
        <UserContext.Provider value={{ profileData, setProfileData }}>
            {children}
        </UserContext.Provider>
    )
}
const useUserHook = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserHook };