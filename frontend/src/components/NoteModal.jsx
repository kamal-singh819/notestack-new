import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState, useEffect } from 'react';
import { SweetAlert } from '../helper/SweetAlert';
import Select from 'react-select';
import 'react-dropdown/style.css';
import commonAxios from '../helper/CommonAxios';

const AddNoteModal = ({ setOpenModal, openModal }) => {
    const onCloseModal = () => setOpenModal(false);
    const [categories, setCategories] = useState([]);
    const [noteCategoryId, setNoteCategoryId] = useState(null);
    const [noteTopic, setNoteTopic] = useState('');
    const [noteType, setNoteType] = useState(null);
    const [college, setCollege] = useState("NONE");
    const [notePdfUrl, setNotePdfUrl] = useState('');
    const [noteDescrip, setNoteDescrip] = useState('');
    const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;

    useEffect(() => {
        async function getAllCategories() {
            const response = await commonAxios({ method: 'get', url: 'categories/get-all-categories', data: {}, token: '' });
            if (response.data.message === 'FETCHED') setCategories(response.data.data.map(ele => ({ value: ele.categoryName, label: ele.categoryName, _id: ele._id })));
        }
        getAllCategories();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!noteCategoryId || !noteTopic || !noteType || !notePdfUrl || !noteDescrip) SweetAlert('All fields Mandatory', 'warning');
        if (noteType === 'PYQs' && college === 'NONE') SweetAlert('College Name is mandatory', 'warning');
        else {
            try {
                const response = await commonAxios({ method: 'post', url: 'notes/upload-notes', token: token, data: { categoryId: noteCategoryId, pdfName: noteTopic, pdfUrl: notePdfUrl, description: noteDescrip, contentType: noteType, collegeName: college } })
                console.log(response);
                if (response.data.message === 'UPLOADED') {
                    SweetAlert('Note Uploaded Successfully!', 'success');
                    setCollege('NONE');
                    setNoteTopic('');
                    setNotePdfUrl('');
                    setNoteDescrip('');
                } else SweetAlert('Something went wrong!', 'warning');
            } catch (error) {
                console.log(error);
                SweetAlert('Something went wrong!', 'warning');
            }
        }
    }

    return (
        <div>
            <Modal open={openModal} onClose={onCloseModal} classNames={{ modal: `w-[18rem] sm:w-[30rem] lg:w-[40rem] rounded-lg` }} center>
                <div className='flex flex-col gap-3 m-4'>
                    <h2 className='text-lg md:text-xl font-semibold mb-4'>Add New Note</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[100%]">
                        <Select onChange={e => setNoteCategoryId(e._id)} options={categories} placeholder="Select Category" />
                        <input
                            onChange={e => setNoteTopic(e.target.value.trim())}
                            value={noteTopic}
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
                            onChange={e => setNotePdfUrl(e.target.value.trim())}
                            value={notePdfUrl}
                            className=" focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
                            type="text"
                            placeholder="pdf link (drive link)"
                        />
                        <textarea
                            onChange={e => setNoteDescrip(e.target.value.trim())}
                            value={noteDescrip}
                            className="focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
                            rows="4"
                            placeholder="Description min 400 characters"
                        ></textarea>
                        <button className="border border-gray-600 bg-red-600 text-white py-2 px-3 rounded-md">
                            Upload
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AddNoteModal;