import axios from 'axios';
import SideLogo from './SideLogo';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const rememberRef = useRef();
    const navigate = useNavigate();

    async function loginApi(email, password){
        const data = {email, password};
        console.log(data);
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/users/login`,
            data: data
        });
        if(response.data.message === 'NOT REGISTERED'){
            console.log('Not registered, please register first');
            navigate('/register');
        }
        else if(response.data.message === 'UNMATCHED'){
            console.log('Email or password is Wrong');
        }
        else if(response.data.message === 'LOGGED IN'){
            console.log('Login successful');
            console.log(response.data.userInfo);
            localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
            navigate('/');
        }
        else console.log('Something went wrong!');
    }

    function handleLogin(e) {
        e.preventDefault();
        loginApi(emailRef.current.value.trim(), passwordRef.current.value.trim());
    }
    function clickResetPassword(){
        navigate('/reset-password');
    }
    function switchToRegisterHandler() {
        navigate('/register');
    }

    return (
        <div className='flex h-[80vh] justify-center items-center'>
            <div className='flex flex-col md:flex-row gap-x-12 rounded-md w-[20rem] md:w-[44rem]'>
                <SideLogo/>
                <div className='px-2'>
                    <h2 className='text-lg font-bold mb-4'>Sign in Yourself</h2>
                    <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="email" placeholder='example@gmail.com' ref={emailRef} />
                        <input className='px-4 py-2.5 focus:outline-none text-black border text-sm rounded-md sm:w-[20rem]' type="password" placeholder='Password' ref={passwordRef} />
                        <div className='flex gap-4'>
                            <p onClick={clickResetPassword} className='cursor-pointer text-neutral-600'>Reset Password</p>
                            <label htmlFor=""><input className='cursor-pointer' type="checkbox" ref={rememberRef}/>Remember me </label>
                        </div>
                        <button className='max-w-[8rem] px-4 py-1 text-md cursor-pointer rounded-md border' type="submit">Login</button>
                    </form>
                    <div className='flex gap-2.5 '>
                        <p className='italic'>Dont have account</p>
                        <button onClick={switchToRegisterHandler} className='cursor-pointer underline hover:text-blue-600'>Register here</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;