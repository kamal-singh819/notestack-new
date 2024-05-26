import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { GrDocumentNotes } from 'react-icons/gr';
import { SweetAlert } from '../helper/SweetAlert';
import { pages } from '../helper/data';
import { useClickAway } from "@uidotdev/usehooks";
import { CgProfile } from "react-icons/cg";
import { useUserHook } from '../contexts/UserContext';
import { baseCdnUrl } from '../helper/CommonAxios';

const Navbar = () => {
    const navigate = useNavigate();
    const [nav, setNav] = useState(false);
    const [currentPage, setCurrentPage] = useState(window.location.pathname || "/");
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
    const { profileData } = useUserHook();
    const handleNav = () => {
        setNav(!nav);
    };

    const handlePageClick = (route) => {
        if (route === '/profile' && !userInfo) {
            navigate('/login');
            setCurrentPage('/login');
            setNav(false);
            return;
        }
        setCurrentPage(route);
        navigate(route);
        setNav(false);
    }
    const handleClickLogo = () => {
        setCurrentPage('/');
        navigate('/');
    }

    const closeNavMenu = useClickAway(() => setNav(false));
    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        SweetAlert("You are Logged out!");
        handleClickLogo();
    }

    return (
        <div className='bg-black sticky top-3 mx-8 flex justify-between items-center h-[5rem] rounded-2xl px-4 text-white z-50'>
            <div onClick={handleClickLogo} className="flex items-center gap-2 md:mr-8 cursor-pointer">
                <GrDocumentNotes className="text-white" />
                <h3 className="text-white font-bold">NOTESTACK</h3>
            </div>
            <ul className='hidden lg:flex items-center relative'>
                {pages.map(item => {
                    if (userInfo && item.name === 'Login') return;
                    else return <li onClick={() => handlePageClick(item.route)} key={item.name} className={`${currentPage === item.route ? 'bg-accentPurple' : 'bg-black'} px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:bg-accentPurple`}>
                        {item.name}
                    </li>
                })}
                <li className='flex items-center gap-3 cursor-pointer px-4 py-2 m-2' onClick={() => handlePageClick('/profile')}>
                    <span className='font-semibold cursor-pointer text-accentOrange'>{!profileData?.name ? "User" : profileData?.name.split(' ')[0]}</span>
                    <div className='h-10 w-10'>{profileData?.imageUrl ? <img className='w-full h-full rounded-full' src={`${baseCdnUrl}${profileData?.imageUrl}`} alt="profile" /> : <CgProfile className='text-white text-4xl' />}</div>
                </li>
            </ul>

            <div onClick={handleNav} className='block lg:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/* Mobile Navigation Menu */}
            <ul ref={closeNavMenu} className={nav ? 'fixed lg:hidden left-0 top-0 w-[60%] h-full pt-5 border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'} >
                <div onClick={handleClickLogo} className="mb-5 flex items-center w-full gap-2 md:mr-8 cursor-pointer">
                    <GrDocumentNotes className="text-white" />
                    <h3 className="text-white font-bold">NOTESTACK</h3>
                </div>
                <li className='flex items-center cursor-pointer' onClick={() => handlePageClick('/profile')}>
                    <span className='p-4 font-semibold cursor-pointer text-accentOrange'>{!profileData?.name ? "User" : profileData?.name.split(' ')[0]}</span>
                    <div className='h-10 w-10'>{profileData?.imageUrl ? <img className='w-full h-full rounded-full' src={`${baseCdnUrl}${profileData?.imageUrl}`} alt="profile" /> : <CgProfile className='text-white text-4xl' />}</div>
                </li>
                {pages.map(item => {
                    if (userInfo && item.name === 'Login') return;
                    else return <li onClick={() => handlePageClick(item.route)} key={item.name} className={`${currentPage === item.route ? 'bg-accentPurple' : 'bg-black'} px-4 py-2 border-b rounded-xl hover:bg-accentPurple duration-300 cursor-pointer border-gray-600`}>
                        {item.name}
                    </li>
                })}
                {userInfo && <li className='p-4 font-semibold cursor-pointer' onClick={handleLogout}>Logout</li>}
            </ul>
        </div>
    );
};

export default Navbar;