import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState, useEffect, useRef } from 'react';
import { SweetAlert } from '../helper/SweetAlert';
import Select from 'react-select';
import 'react-dropdown/style.css';
import commonAxios from '../helper/CommonAxios';

const NoteModal = ({ setOpenModal, openModal, updatableNote, setAnyChange }) => {
    const onCloseModal = () => setOpenModal(false);
    const [categories, setCategories] = useState([]);
    const [noteCategoryId, setNoteCategoryId] = useState(null);
    const noteTopicRef = useRef();
    const [noteType, setNoteType] = useState(null);
    const [college, setCollege] = useState("NONE");
    const noteUrlRef = useRef();
    const noteDescriptionRef = useRef();
    const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;

    useEffect(() => {
        async function getAllCategories() {
            const response = await commonAxios({ method: 'get', url: 'categories/get-all-categories', data: {}, token: '' });
            if (response.data.message === 'FETCHED') setCategories(response.data.data.map(ele => ({ value: ele.categoryName, label: ele.categoryName, _id: ele._id })));
        }
        getAllCategories();
    }, []);

    async function uploadNoteApi({ categoryId, pdfName, pdfUrl, description, contentType, collegeName }) {
        try {
            const response = await commonAxios({ method: 'post', url: 'notes/upload-note', token: token, data: { categoryId, pdfName, pdfUrl, description, contentType, collegeName } });
            console.log(response);
            if (response.data.message === 'UPLOADED') {
                SweetAlert('Note Uploaded Successfully!', 'success');
                setCollege('NONE');
                noteTopicRef.current.value = '';
                noteUrlRef.current.value = '';
                noteDescriptionRef.current.value = '';
            } else SweetAlert('Something went wrong!', 'warning');
        } catch (error) {
            SweetAlert('Something went wrong!', 'warning');
        }
    }
    async function updateNoteApi({ noteId, categoryId, pdfName, pdfUrl, description, contentType, collegeName }) {
        try {
            const response = await commonAxios({ method: 'put', url: `notes/update-note/?noteId=${noteId}`, token: token, data: { categoryId, pdfName, pdfUrl, description, contentType, collegeName } });
            if (response.data.message === 'UPDATED') {
                SweetAlert('Note Updated Successfully!', 'success');
                setCollege('NONE');
                noteTopicRef.current.value = '';
                noteUrlRef.current.value = '';
                noteDescriptionRef.current.value = '';
                setAnyChange(prev => !prev);
                setOpenModal(false);
            } else SweetAlert('Something went wrong!', 'warning');
        } catch (error) {
            SweetAlert('Something went wrong!', 'warning');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const noteTopic = noteTopicRef.current.value.trim();
        const notePdfUrl = noteUrlRef.current.value.trim();
        const noteDescrip = noteDescriptionRef.current.value.trim();
        console.log(noteCategoryId, noteTopic, noteType, notePdfUrl, noteDescrip);
        if (!noteCategoryId || !noteTopic || !noteType || !notePdfUrl || !noteDescrip) SweetAlert('All fields Mandatory', 'warning');
        else if (noteType === 'PYQs' && college === 'NONE') SweetAlert('College Name is mandatory', 'warning');
        else if (!updatableNote) uploadNoteApi({ categoryId: noteCategoryId, pdfName: noteTopic, pdfUrl: notePdfUrl, description: noteDescrip, contentType: noteType, collegeName: college });
        else updateNoteApi({ noteId: updatableNote?._id, categoryId: noteCategoryId, pdfName: noteTopic, pdfUrl: notePdfUrl, description: noteDescrip, contentType: noteType, collegeName: college });
    }

    return (
        <div>
            <Modal open={openModal} onClose={onCloseModal} classNames={{ modal: `w-[18rem] sm:w-[30rem] lg:w-[40rem] rounded-lg` }} center>
                <div className='flex flex-col gap-3 m-4'>
                    <h2 className='text-lg md:text-xl font-semibold mb-4'>{updatableNote ? "Update Note" : "Add New Note"}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[100%]">
                        <Select onChange={e => setNoteCategoryId(e._id)} options={categories} placeholder="Select Category" />
                        <input
                            ref={noteTopicRef}
                            defaultValue={updatableNote?.pdfName}
                            className=" focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
                            type="text"
                            placeholder="Topic Name/ Subject Name"
                        />
                        <select onChange={(e) => setNoteType(e.target.value)} className='focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md cursor-pointer opacity-90'>
                            <option value="none" selected disabled hidden>Choose Type</option>
                            <option value="PYQs" name="type">PYQs</option>
                            <option value="NOTES" name="type">Notes</option>
                        </select>
                        <select onChange={(e) => setCollege(e.target.value)} className={` ${noteType === 'PYQs' ? 'block' : 'hidden'} focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md cursor-pointer opacity-90`}>
                            <option value="none" selected disabled hidden>Choose College</option>
                            <option value="UIT Burdwan, WB" name="type">UIT Burdwan, WB</option>
                            <option value="Other" name="type">Other</option>
                        </select>
                        <input
                            ref={noteUrlRef}
                            defaultValue={updatableNote?.pdfUrl}
                            className=" focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
                            type="text"
                            placeholder="pdf link (drive link)"
                        />
                        <textarea
                            ref={noteDescriptionRef}
                            defaultValue={updatableNote?.description}
                            className="focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
                            rows="4"
                            placeholder="Description min 400 characters"
                        ></textarea>
                        <button className="border border-gray-600 bg-red-600 text-white py-2 px-3 rounded-md">
                            {updatableNote ? "Update" : "Upload"}
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default NoteModal;