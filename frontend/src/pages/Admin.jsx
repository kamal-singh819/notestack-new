import { useState } from 'react';
import 'react-dropdown/style.css';
import CategoryModal from '../components/modals/CategoryModal';
import NoteModal from '../components/modals/NoteModal';
import RichTextEditor from '../components/RichTextEditor';
import ArticleEditor from './ArticleEditor';

const Admin = () => {
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div className='pb-5 pt-10'>
            <div className='flex justify-end gap-5 items-end p-4'>
                {userInfo?.role === 'Admin' && <button onClick={() => setOpenCategoryModal(true)} className='cursor-pointer border border-gray-600 bg-red-400 text-white px-4 py-2  rounded-full max-w-[10rem]'>Add category</button>}
                <button onClick={() => setOpenNoteModal(true)} className='cursor-pointer border border-gray-600 bg-red-400 text-white px-4 py-2 rounded-full max-w-[10rem]'>Add Note</button>
            </div>
            {/* <RichTextEditor /> */}
            <ArticleEditor />
            {openCategoryModal && <CategoryModal setOpenModal={setOpenCategoryModal} openModal={openCategoryModal} />}
            {openNoteModal && <NoteModal setOpenModal={setOpenNoteModal} openModal={openNoteModal} />}
        </div>
    );
};
export default Admin;
