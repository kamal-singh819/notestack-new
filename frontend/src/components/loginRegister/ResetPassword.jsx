import SideLogo from './SideLogo';
import { useRef } from 'react';

const ResetPassword = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const otpRef = useRef();

    function handleSendEmail(e) {
        e.preventDefault();
        console.log(emailRef.current.value);
    }
    function handleReset(e) {
        e.preventDefault();
        console.log(otpRef.current.value, passwordRef.current.value);
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
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="password" placeholder='Enter OTP' ref={otpRef}/>
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="password" placeholder='New Password' ref={passwordRef}/>
                        <button className='max-w-[8rem] px-4 py-1 text-md cursor-pointer rounded-md border' type="submit">Reset</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;