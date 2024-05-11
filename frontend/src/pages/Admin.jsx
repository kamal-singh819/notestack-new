import { useEffect, useState } from 'react';
import 'react-dropdown/style.css';
import CategoryModal from '../components/CategoryModal';
import NoteModal from '../components/NoteModal';
// const token = JSON.parse(localStorage.getItem('userInfo'))?.accessToken;

const Admin = () => {
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openNoteModal, setOpenNoteModal] = useState(false);

    return (
        <div className='bg-darkColor min-h-[calc(100vh-5rem)]'>
            <div onClick={() => setOpenCategoryModal(true)} className='cursor-pointer border border-gray-600 bg-red-400 w-[10rem] text-white px-4 py-2  rounded-full'>Add category</div>
            <div onClick={() => setOpenNoteModal(true)} className='cursor-pointer border border-gray-600 bg-red-400 w-[10rem] text-white px-4 py-2 rounded-full'>Add Note</div>
            {openCategoryModal && <CategoryModal setOpenModal={setOpenCategoryModal} openModal={openCategoryModal} />}
            {openNoteModal && <NoteModal setOpenModal={setOpenNoteModal} openModal={openNoteModal} />}
        </div>
    );
};
export default Admin;
