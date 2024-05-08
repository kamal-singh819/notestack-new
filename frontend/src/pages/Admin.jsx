import { useEffect, useState } from 'react';
import Select from 'react-select';
import 'react-dropdown/style.css';
import axios from 'axios';
import { SweetAlert } from '../helper/SweetAlert';
import AddCategoryModal from '../components/CategoryModal';
const token = JSON.parse(localStorage.getItem('userInfo'))?.accessToken;

const Admin = () => {
    const [categories, setCategories] = useState([]);
    const [noteCategoryId, setNoteCategoryId] = useState(null);
    const [noteTopic, setNoteTopic] = useState('');
    const [noteType, setNoteType] = useState(null);
    const [college, setCollege] = useState("NONE");
    const [notePdfUrl, setNotePdfUrl] = useState('');
    const [noteDescrip, setNoteDescrip] = useState('');
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        async function getAllCategories() {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:5000/categories/get-all-categories'
            });
            if (response.data.message === 'FETCHED') setCategories(response.data.data.map(ele => ({ value: ele.categoryName, label: ele.categoryName, _id: ele._id })));
        }
        getAllCategories();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(noteCategoryId, noteDescrip, notePdfUrl, noteTopic, noteType);
        if (!noteCategoryId || !noteTopic || !noteType || !notePdfUrl || !noteDescrip) SweetAlert('All fields Mandatory', 'warning');
        if (noteType === 'PYQs' && college === 'NONE') SweetAlert('College Name is mandatory', 'warning');
        else {
            try {
                const response = await axios({
                    method: 'post',
                    url: `http://localhost:5000/notes/upload-notes`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    data: { categoryId: noteCategoryId, pdfName: noteTopic, pdfUrl: notePdfUrl, description: noteDescrip, contentType: noteType, collegeName: college },
                });
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
        <div className='flex justify-center min-h-[calc(100vh-4rem)] bg-darkColor'>
            <div className="flex flex-col items-center gap-5 mt-10 w-full">
                <h2 className="text-xl font-bold text-white">Upload Notes</h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 w-[96%] md:w-[80%] xl:w-[60%] relative"
                >
                    <Select onChange={e => setNoteCategoryId(e._id)} options={categories} placeholder="Select Category" />
                    <input
                        onChange={e => setNoteTopic(e.target.value)}
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
                        onChange={e => setNotePdfUrl(e.target.value)}
                        value={notePdfUrl}
                        className=" focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
                        type="text"
                        placeholder="pdf link (drive link)"
                    />
                    <textarea
                        onChange={e => setNoteDescrip(e.target.value)}
                        value={noteDescrip}
                        className="focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
                        rows="4"
                        placeholder="Description min 400 characters"
                    ></textarea>
                    <button className="border border-gray-600 bg-red-600 text-white py-2 px-3 rounded-md">
                        Upload
                    </button>
                    <span onClick={() => setOpenModal(true)} className='cursor-pointer border border-gray-600 bg-red-400 duration-300 ease-in hover:bg-red-600 text-white py-2 px-3 rounded-md absolute right-0 top-[-3rem]'>Add Category</span>
                </form>
            </div>
            <AddCategoryModal setOpenModal={setOpenModal} openModal={openModal} />
        </div>
    );
};
export default Admin;
