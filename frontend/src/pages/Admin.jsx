import { useEffect, useState } from 'react';
import Select from 'react-select';
import 'react-dropdown/style.css';
import axios from 'axios';
import { SweetAlert } from '../helper/SweetAlert';
import AddCategoryModal from '../components/CategoryModal';
import AddNoteModal from '../components/NoteModal';
const token = JSON.parse(localStorage.getItem('userInfo'))?.accessToken;

const Admin = () => {
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openNoteModal, setOpenNoteModal] = useState(false);

    return (
        <div className='bg-darkColor h-[80vh]'>
            <div onClick={() => setOpenCategoryModal(true)} className='cursor-pointer border border-gray-600 bg-red-400 w-[10rem] text-white px-4 py-2  rounded-full'>Add category</div>
            <div onClick={() => setOpenNoteModal(true)} className='cursor-pointer border border-gray-600 bg-red-400 w-[10rem] text-white px-4 py-2 rounded-full'>Add Note</div>
            {openCategoryModal && <AddCategoryModal setOpenModal={setOpenCategoryModal} openModal={openCategoryModal} />}
            {openNoteModal && <AddNoteModal setOpenModal={setOpenNoteModal} openModal={openNoteModal} />}
        </div>
    );
};
export default Admin;
