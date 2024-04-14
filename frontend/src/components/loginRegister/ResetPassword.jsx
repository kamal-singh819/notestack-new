import SideLogo from './SideLogo';
import { useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const otpRef = useRef();
    const [emailOtp, setEmailOtp] = useState(null);
    
    async function sendOtpApi(email) {
        const data = {email};
        console.log(data);
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/users/send-otp`,
            data: data
        });
        console.log(response.data.emailOTP);
        setEmailOtp(response.data.emailOTP);
    }
    async function resetPasswordApi(password, confirmPassword, email) {
        const data = {email, password, confirmPassword};
        console.log(data);
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/users/reset-password`,
            data: data
        });
        if(response.data.message === 'MISSING'){
            console.log('User does not exists, Create your account');
            navigate('/register');
        }
        else if(response.data.message === 'UPDATED'){
            console.log('Password updated, Now login Yourself');
            navigate('/login');
        }else{
            console.log('Something went wrong');
        }
    }

    function handleSendEmail(e) {
        e.preventDefault();
        sendOtpApi(emailRef.current.value);
    }
    function handleReset(e) {
        e.preventDefault();
        const enteredOtp = otpRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();
        if(!enteredOtp || !password || !confirmPassword ){
            console.log("SweetAlert All fields are mandatory");
            return;
        }
        else if(password !== confirmPassword){
            console.log("Passwords are not matched");
            return;
        }
        else if(emailOtp && enteredOtp !== emailOtp.sentOtp) {
            console.log("Sweet Alert, Please enter correct otp");
            return;
        }
        else if(password === confirmPassword && emailOtp && enteredOtp === emailOtp.sentOtp){
            resetPasswordApi(password, confirmPassword, emailOtp.email);
            setEmailOtp(null);
        }
    }

    return (
        <div className='flex h-[80vh] justify-center items-center'>
            <div className='flex flex-col md:flex-row gap-x-12 rounded-md w-[20rem] md:w-[44rem]'>
                <SideLogo/>
                <div className='flex flex-col gap-4 px-2'>
                    <h2 className='text-lg font-bold mb-4'>Reset Your Password</h2>
                    <form onSubmit={handleSendEmail} className='flex flex-col gap-3'>
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="email" placeholder='example@gmail.com' ref={emailRef}/>
                        <button className='max-w-[8rem] px-4 py-1 text-md cursor-pointer rounded-md border' type='submit'>Send OTP</button>
                    </form>
                    <form onSubmit={handleReset} className='flex flex-col gap-3'>
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="text" placeholder='Enter OTP' ref={otpRef}/>
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="password" placeholder='New Password' ref={passwordRef}/>
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="text" placeholder='Confirm Password' ref={confirmPasswordRef}/>
                        <button className='max-w-[8rem] px-4 py-1 text-md cursor-pointer rounded-md border' type="submit">Reset</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;