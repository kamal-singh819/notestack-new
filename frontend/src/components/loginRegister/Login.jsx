import SideLogo from "./SideLogo";
import { SweetAlert } from "../../helper/SweetAlert";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import commonAxios from '../../helper/CommonAxios';
import { useUserHook } from '../../contexts/UserContext';
import signInWithGoogle from "../../services/AuthService";
import googleIcon from '../../assets/googleIcon.svg';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState({});
    const { setTriggerAfterLogin, setProfileData } = useUserHook();
    const navigate = useNavigate();

    async function handleGoogleSignIn() {
        const { idToken, user, error } = await signInWithGoogle();
        // console.log("Google login with", user);
        if (error) SweetAlert("Something wrong", 'warning');
        else {
            const response = await commonAxios({ method: 'post', url: 'users/login-with-google', token: idToken, data: {} });
            // console.log(response);
            if (response.data.message === "LOGGED IN") {
                localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
                setTriggerAfterLogin(response.data.userInfo);
                navigate("/");
                SweetAlert("You are Logged In Successfully!", "success");
            }
        }
    }

    async function loginApi(email, password) {
        const data = { email, password };
        const response = await commonAxios({ method: 'post', url: "users/login", data: data });
        if (response.data.message === "NOT REGISTERED") {
            SweetAlert("You are not registered! Please Register", "warning");
            navigate("/register");
        } else if (response.data.message === "UNMATCHED") {
            SweetAlert("Password is not matched!", "warning");
        } else if (response.data.message === "LOGGED IN") {
            localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
            setTriggerAfterLogin(response.data.userInfo);
            navigate("/");
            SweetAlert("You are Logged In Successfully!", "success");
        } else SweetAlert("Something Wrong", "warning");
    }

    function handleLogin(e) {
        e.preventDefault();
        const validationErrors = {};
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if (!email) validationErrors.email = "Email is required!";
        else if (!/\S+@\S+\.\S+/.test(email))
            validationErrors.email = "Email is invalid!";
        if (!password) validationErrors.password = "Password is required!";
        else if (password.length < 6)
            validationErrors.password =
                "Password should have atleast six characters!";
        setErrors(validationErrors);
        if (!Object.keys(validationErrors).length) loginApi(email, password);
    }
    function clickResetPassword() {
        navigate("/reset-password");
    }
    function switchToRegisterHandler() {
        navigate("/register");
    }

    return (
        <div className="flex h-[80vh] justify-center items-center">
            <div className="flex flex-col md:flex-row gap-x-12 rounded-md w-[20rem] sm:w-[30rem] md:w-[45rem] border py-10 sm:px-20 bg-accentPurple">
                <SideLogo />
                <div className="px-2">
                    <h2 className="text-lg font-bold mb-4 text-white">Sign in Yourself</h2>
                    <div className="bg-white rounded-md flex gap-3 items-center justify-center cursor-pointer" onClick={handleGoogleSignIn}>
                        <img className="h-10 w-10" src={googleIcon} alt="google icon" />
                        <span className="text-black">Continue with Google</span>
                    </div>
                    <div className="text-white text-center my-4">------------ OR --------------</div>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <input
                                className="px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[18rem]"
                                type="email"
                                placeholder="example@gmail.com"
                                ref={emailRef}
                            />
                            {errors.email && (
                                <span className="text-xs text-red-600">{errors.email} </span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input
                                className="px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[18rem]"
                                type="password"
                                placeholder="Password"
                                ref={passwordRef}
                            />
                            {errors.password && (
                                <span className="text-xs text-red-600">{errors.password}</span>
                            )}
                        </div>
                        <p onClick={clickResetPassword} className="cursor-pointer text-neutral-300 underline hover:text-white -mt-4">
                            Reset Password
                        </p>
                        <button
                            className="max-w-[8rem] px-4 py-1 text-md cursor-pointer rounded-md border text-white duration-300 ease-in hover:bg-white hover:text-black"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                    <div className="flex gap-2.5 ">
                        <p className="italic text-white">Dont have account</p>
                        <button
                            onClick={switchToRegisterHandler}
                            className="cursor-pointer text-neutral-300 underline hover:text-white"
                        >
                            Register here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
