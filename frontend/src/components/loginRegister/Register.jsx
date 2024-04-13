import SideLogo from './SideLogo';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    function handleRegister(e) {
        e.preventDefault();
        console.log("registration details are : ", {name: nameRef.current.value, email: emailRef.current.value, phone: phoneRef.current.value, password: passwordRef.current.value});
    }
    function switchToLoginHandler() {
        navigate('/login');
    }

    return (
        <div className='flex h-[80vh] justify-center items-center'>
            <div className='flex flex-col md:flex-row gap-x-12 rounded-md w-[20rem] md:w-[44rem]'>
                <SideLogo/>
                <div className='px-2'>
                    <h2 className='text-lg font-bold mb-4'>Register Yourself</h2>
                    <form onSubmit={handleRegister} className='flex flex-col gap-3'>
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="text" placeholder='Mark Peter' ref={nameRef}/>
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="email" placeholder='example@gmail.com' ref={emailRef}/>
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="tel" placeholder='8192xxxxxx' ref={phoneRef}/>
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="password" placeholder='Password' ref={passwordRef}/>
                        <button className='max-w-[8rem] px-4 py-1 text-md cursor-pointer rounded-md border' type="submit">Register</button>
                    </form>
                    <div className='flex gap-2.5 '>
                        <p className='italic'>Already registered</p>
                        <button onClick={switchToLoginHandler} className='cursor-pointer underline hover:text-blue-600'>Login here</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;