import SideLogo from "./SideLogo";
import { SweetAlert } from "../../helper/SweetAlert";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import commonAxios from "../../helper/CommonAxios";

const ResetPassword = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const otpRef = useRef();
    const [errors, setErrors] = useState({});
    const [emailOtp, setEmailOtp] = useState(null);

    async function sendOtpApi(email) {
        const data = { email };
        const response = await commonAxios({ method: 'post', url: "users/send-otp", data: data });
        setEmailOtp(response.data.emailOTP);
        SweetAlert("OTP Sent to email!", "success");
    }
    async function resetPasswordApi(password, confirmPassword, email) {
        const data = { email, password, confirmPassword };
        const response = await commonAxios({ method: 'post', url: "users/reset-password", data: data });
        if (response.data.message === "MISSING") {
            SweetAlert("You are not registered! Please Register", "warning");
            navigate("/register");
        } else if (response.data.message === "UPDATED") {
            SweetAlert("Password is updated Successfully!", "success");
            navigate("/login");
        } else {
            SweetAlert("Something went wrong!", "warning");
        }
    }

    function handleSendEmail(e) {
        e.preventDefault();
        const validationErrors = {};
        const email = emailRef.current.value.trim();
        if (!email) validationErrors.email = "Email is required!";
        else if (!/\S+@\S+\.\S+/.test(email))
            validationErrors.email = "Email is invalid!";
        setErrors(validationErrors);
        if (!Object.keys(validationErrors).length)
            sendOtpApi(emailRef.current.value);
    }
    function handleReset(e) {
        e.preventDefault();
        const validationErrors = {};
        const enteredOtp = otpRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();
        if (!enteredOtp) validationErrors.enteredOtp = "OTP is required!";
        if (!password) validationErrors.password = "Password is required!";
        else if (password.length < 6)
            validationErrors.password =
                "Password should have atleast six characters!";
        if (!confirmPassword)
            validationErrors.confirmPassword = "Password is required!";
        else if (confirmPassword !== password)
            validationErrors.confirmPassword = "Both passwords must be same!";
        setErrors(validationErrors);
        if (emailOtp && enteredOtp !== emailOtp.sentOtp) {
            console.log("Sweet Alert, Please enter correct otp");
            return;
        }
        if (!Object.keys(validationErrors).length) {
            resetPasswordApi(password, confirmPassword, emailOtp.email);
            setEmailOtp(null);
        }
    }

    return (
        <div className="flex h-[80vh] justify-center items-center">
            <div className="flex flex-col md:flex-row gap-x-12 rounded-md w-[20rem] sm:w-[30rem] md:w-[45rem] border py-10 sm:px-20 bg-accentPurple">
                <SideLogo />
                <div className="flex flex-col gap-4 px-2">
                    <h2 className="text-lg font-bold mb-4 text-white">Reset Your Password</h2>
                    <form onSubmit={handleSendEmail} className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <input
                                className="px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[18rem]"
                                type="email"
                                placeholder="example@gmail.com"
                                ref={emailRef}
                            />
                            {errors.email && (
                                <span className="text-xs text-red-600">{errors.email}</span>
                            )}
                        </div>
                        <button
                            className="max-w-[8rem] px-4 py-1 text-md cursor-pointer rounded-md border text-white duration-300 ease-in hover:bg-white hover:text-black"
                            type="submit"
                        >
                            Send OTP
                        </button>
                    </form>
                    <form onSubmit={handleReset} className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <input
                                className="px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[18rem]"
                                type="text"
                                placeholder="Enter OTP"
                                ref={otpRef}
                            />
                            {errors.enteredOtp && (
                                <span className="text-xs text-red-600">
                                    {errors.enteredOtp}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input
                                className="px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[18rem]"
                                type="password"
                                placeholder="New Password"
                                ref={passwordRef}
                            />
                            {errors.password && (
                                <span className="text-xs text-red-600">{errors.password}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input
                                className="px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[18rem]"
                                type="text"
                                placeholder="Confirm Password"
                                ref={confirmPasswordRef}
                            />
                            {errors.confirmPassword && (
                                <span className="text-xs text-red-600">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                        <button
                            className="max-w-[8rem] px-4 py-1 text-md cursor-pointer rounded-md border text-white duration-300 ease-in hover:bg-white hover:text-black"
                            type="submit"
                        >
                            Reset
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
