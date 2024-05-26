import { Outlet, Navigate } from 'react-router-dom';
const PrivateRoute = ({ roles }) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
    if (!userInfo) return <Navigate to='/login' />;
    if (roles && !roles.includes(userInfo.role)) {
        //Unauthoried Route
        return <Navigate to='/' />;
    }

    return <Outlet />;
}

export default PrivateRoute;
