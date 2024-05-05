import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { GrDocumentNotes } from 'react-icons/gr';
import { SweetAlert } from '../helper/SweetAlert';

const Navbar = () => {
    const navigate = useNavigate();
    const [nav, setNav] = useState(false);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
    const handleNav = () => {
        setNav(!nav);
    };

    // Array containing navigation items
    const pages = [
        { name: 'Home', route: '/' },
        { name: 'Notes', route: '/notes' },
        { name: 'Articles', route: '/articles' },
        { name: 'Admin', route: '/admin' },
        { name: 'Login', route: '/login' },
    ];
    const handlePageClick = (route) => {
        if (route === '/admin' && !userInfo) {
            SweetAlert("You are not Logged In.", "warning");
            navigate('/login');
            setCurrentPage('/login');
        }
        else if (route === '/admin' && userInfo && !userInfo.isAdmin) SweetAlert("You are allowed to open Admin Panel.", "warning");
        else {
            setCurrentPage(route);
            navigate(route);
        }
    }
    const handleClickLogo = () => {
        setCurrentPage('/');
        navigate('/');
    }

    return (
        <div className='bg-black sticky top-0 flex justify-between items-center h-[5rem] w-full mx-auto px-4 text-white z-50'>
            <div onClick={handleClickLogo} className="flex items-center gap-2 md:mr-8 cursor-pointer">
                <GrDocumentNotes className="text-white" />
                <h3 className="text-white font-bold">NOTESTACK</h3>
            </div>
            <ul className='hidden md:flex items-center'>
                {pages.map(item => (
                    <li onClick={() => handlePageClick(item.route)} key={item.name} className={`${currentPage === item.route ? 'bg-[#00df9a] text-black' : 'bg-black'} px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:bg-[#00df9a] hover:text-black`}>
                        {item.name}
                    </li>
                ))}
                <li className='p-4 font-semibold cursor-pointer text-accentOrange'>{!userInfo ? "Hey User!" : userInfo?.name.split(' ')[0]}</li>
            </ul>

            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/* Mobile Navigation Menu */}
            <ul className={nav ? 'fixed md:hidden left-0 top-0 w-[60%] h-full pt-5 border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'} >
                <div onClick={handleClickLogo} className="mb-5 flex items-center w-full gap-2 md:mr-8 cursor-pointer">
                    <GrDocumentNotes className="text-white" />
                    <h3 className="text-white font-bold">NOTESTACK</h3>
                </div>
                <li className='p-4 font-semibold cursor-pointer text-accentOrange'>{!userInfo ? "Hey User!" : "Hey " + userInfo?.name.split(' ')[0]}</li>
                {pages.map(item => (
                    <li onClick={() => handlePageClick(item.route)} key={item.name} className={`${currentPage === item.route ? 'bg-[#00df9a] text-black' : 'bg-black'} px-4 py-2 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600`}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navbar;