import axios from "axios";
import SideLogo from "./SideLogo";
import { LoginRegisterAlert } from "../../helper/SweetAlert";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const rememberRef = useRef();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function loginApi(email, password) {
    const data = { email, password };
    console.log(data);
    const response = await axios({
      method: "post",
      url: `http://localhost:5000/users/login`,
      data: data,
    });
    if (response.data.message === "NOT REGISTERED") {
      LoginRegisterAlert("You are not registered! Please Register", "warning");
      navigate("/register");
    } else if (response.data.message === "UNMATCHED") {
      LoginRegisterAlert("Password is not matched!", "warning");
    } else if (response.data.message === "LOGGED IN") {
      localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
      navigate("/");
      LoginRegisterAlert("You are Logged In Successfully!", "success");
    } else console.log("Something went wrong!");
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
      <div className="flex flex-col md:flex-row gap-x-12 rounded-md w-[20rem] sm:w-[30rem] md:w-[45rem] border py-10 sm:px-20">
        <SideLogo />
        <div className="px-2">
          <h2 className="text-lg font-bold mb-4">Sign in Yourself</h2>
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
            <div className="flex gap-4">
              <p
                onClick={clickResetPassword}
                className="cursor-pointer text-neutral-600 underline hover:text-blue-400"
              >
                Reset Password
              </p>
              <label htmlFor="">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  ref={rememberRef}
                />
                Remember me{" "}
              </label>
            </div>
            <button
              className="max-w-[8rem] px-4 py-1 text-md cursor-pointer rounded-md border"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="flex gap-2.5 ">
            <p className="italic">Dont have account</p>
            <button
              onClick={switchToRegisterHandler}
              className="cursor-pointer underline hover:text-blue-600"
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
