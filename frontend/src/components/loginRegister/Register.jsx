import commonAxios from "../../helper/CommonAxios";
import SideLogo from "./SideLogo";
import { SweetAlert } from "../../helper/SweetAlert";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    async function registerApi(name, email, password) {
        const data = { name, email, password };
        const response = await commonAxios({ method: 'post', url: "users/register", data: data });
        if (response.data.message === "EXISTS") {
            navigate("/login");
            SweetAlert("Email is already exists, Please Login", "warning");
        } else if (response.data.message === "CREATED") {
            navigate("/login");
            SweetAlert("Registered Successfully!", "success");
        } else SweetAlert("Something went wrong!", "warning");
    }

    function handleRegister(e) {
        e.preventDefault();
        const validationErrors = {};
        const name = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();

        if (!name) validationErrors.name = "Name is required!";
        if (!email) validationErrors.email = "Email is required!";
        else if (!/\S+@\S+\.\S+/.test(email))
            validationErrors.email = "Email is invalid!";
        if (!password) validationErrors.password = "Password is required!";
        else if (password.length < 6)
            validationErrors.password =
                "Password should have atleast six characters!";
        if (!confirmPassword)
            validationErrors.confirmPassword = "Password is required!";
        else if (confirmPassword !== password)
            validationErrors.confirmPassword = "Both passwords must be same!";
        setErrors(validationErrors);

        if (!Object.keys(validationErrors).length)
            registerApi(name, email, password);
    }
    function switchToLoginHandler() {
        navigate("/login");
    }

    return (
        <div className="flex h-[80vh] justify-center items-center">
            <div className="flex flex-col md:flex-row gap-x-12 rounded-md w-[20rem] sm:w-[30rem] md:w-[45rem] border py-10 sm:px-20 bg-accentPurple">
                <SideLogo />
                <div className="px-2">
                    <h2 className="text-lg font-bold mb-4 text-white">Register Yourself</h2>
                    <form onSubmit={handleRegister} className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <input
                                className="px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[18rem]"
                                type="text"
                                placeholder="Mark Peter"
                                ref={nameRef}
                            />
                            {errors.name && (
                                <span className="text-xs text-red-600">{errors.name}</span>
                            )}
                        </div>
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
                            Register
                        </button>
                    </form>
                    <div className="flex gap-2.5 ">
                        <p className="italic text-white">Already registered</p>
                        <button
                            onClick={switchToLoginHandler}
                            className="cursor-pointer text-neutral-300 underline hover:text-white"
                        >
                            Login here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
