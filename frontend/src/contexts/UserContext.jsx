import { createContext, useContext, useState, useEffect } from "react";
import commonAxios from "../helper/CommonAxios";
// import signInWithGoogle from "../services/AuthService";

const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [triggerAfterLogin, setTriggerAfterLogin] = useState(JSON.parse(localStorage.getItem('userInfo')));
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        async function getUserDetailsApi() {
            if (triggerAfterLogin) {
                const response = await commonAxios({ method: 'get', url: `users/get-user`, token: triggerAfterLogin?.accessToken });
                if (response.status === 200) setProfileData(response.data.data);
            }
        }
        getUserDetailsApi();
    }, [triggerAfterLogin]); //useEffect will trigger after logging in

    return (
        <UserContext.Provider value={{ profileData, setProfileData, setTriggerAfterLogin }}>
            {children}
        </UserContext.Provider>
    )
}
const useUserHook = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserHook };