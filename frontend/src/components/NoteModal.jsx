import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState, useEffect, useRef } from 'react';
import { SweetAlert } from '../helper/SweetAlert';
import Select from 'react-select';
import 'react-dropdown/style.css';
import commonAxios from '../helper/CommonAxios';

const NoteModal = ({ setOpenModal, openModal, updatableData, setAnyChange, what }) => {
    const onCloseModal = () => setOpenModal(false);
    const [categories, setCategories] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isNote, setIsNote] = useState(true); // note or [pyq/class notes]

    useEffect(() => {
        if (what === "PYQs") setIsNote(false); // else set isNote as true
        async function getAllCategoriesAndSubjects() {
            const categoryResponse = await commonAxios({ method: 'get', url: 'categories/get-all-categories', data: {}, token: '' });
            if (categoryResponse.data.message === 'FETCHED') setCategories(categoryResponse.data.data.map(ele => ({ value: ele.categoryName, label: ele.categoryName, _id: ele._id })));
            const subjectResponse = await commonAxios({ method: 'get', url: 'subjects/get-all-subjects', data: {}, token: '' });
            if (subjectResponse.data.message === 'FETCHED') setSubjects(subjectResponse.data.data.map(ele => ({ value: ele.subjectName, label: ele.subjectName, _id: ele._id })));
        }
        getAllCategoriesAndSubjects();
    }, []);

    const categoryIdRef = useRef(); // cs -> category or subject
    const onClear = () => { categoryIdRef.current.clearValue() };
    const pdfNameRef = useRef();
    const pdfUrlRef = useRef();
    const descriptionRef = useRef();
    const [collegeName, setCollegeName] = useState(null); //for pyq & class notes
    const [isPyq, setIsPyq] = useState(true); //  pyq or class notes
    const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
    function updateFieldsAfterSubmit(pdfNameRef, pdfUrlRef, descriptionRef) {
        pdfNameRef.current.value = '';
        pdfUrlRef.current.value = '';
        descriptionRef.current.value = '';
    }

    async function uploadNoteApi({ categoryId, pdfName, pdfUrl, description }) {
        try {
            const response = await commonAxios({ method: 'post', url: 'notes/upload-note', token: token, data: { categoryId, pdfName, pdfUrl, description } });
            if (response.data.message === 'UPLOADED') {
                SweetAlert('Uploaded Successfully!', 'success');
                updateFieldsAfterSubmit(pdfNameRef, pdfUrlRef, descriptionRef);
            } else SweetAlert('Something went wrong!', 'warning');
        } catch (error) {
            SweetAlert('Something went wrong!', 'warning');
        }
    }
    async function uploadPyqClassNotesApi({ subjectId, pdfName, pdfUrl, description, collegeName, isPyq }) {
        try {
            const response = await commonAxios({ method: 'post', url: 'pyqs/upload-pyq', token: token, data: { subjectId, pdfName, pdfUrl, description, collegeName, isPyq } });
            if (response.data.message === 'UPLOADED') {
                SweetAlert('Uploaded Successfully!', 'success');
                updateFieldsAfterSubmit(pdfNameRef, pdfUrlRef, descriptionRef);
            } else SweetAlert('Something went wrong!', 'warning');
        } catch (error) {
            SweetAlert('Something went wrong!', 'warning');
        }
    }


    async function updateNoteApi({ noteId, categoryId, pdfName, pdfUrl, description }) {
        try {
            const response = await commonAxios({ method: 'put', url: `notes/update-note/?noteId=${noteId}`, token: token, data: { categoryId, pdfName, pdfUrl, description } });
            if (response.data.message === 'UPDATED') {
                SweetAlert('Note Updated Successfully!', 'success');
                updateFieldsAfterSubmit(pdfNameRef, pdfUrlRef, descriptionRef);
                setAnyChange(prev => !prev);
                setOpenModal(false);
            } else SweetAlert('Something went wrong!', 'warning');
        } catch (error) {
            SweetAlert('Something went wrong!', 'warning');
        }
    }
    async function updatePyqClassNotesApi({ pyqId, subjectId, pdfName, pdfUrl, description, collegeName, isPyq }) {
        try {
            const response = await commonAxios({ method: 'put', url: `pyqs/update-pyq/?pyqId=${pyqId}`, token: token, data: { subjectId, pdfName, pdfUrl, description, collegeName, isPyq } });
            if (response.data.message === 'UPDATED') {
                SweetAlert('Note Updated Successfully!', 'success');
                updateFieldsAfterSubmit(pdfNameRef, pdfUrlRef, descriptionRef);
                setAnyChange(prev => !prev);
                setOpenModal(false);
            } else SweetAlert('Something went wrong!', 'warning');
        } catch (error) {
            SweetAlert("Something went wrong!", 'warning');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const csId = categoryIdRef.current.props.value?._id;
        const pdfName = pdfNameRef.current.value.trim();
        const pdfUrl = pdfUrlRef.current.value.trim();
        const description = descriptionRef.current.value.trim();
        // console.log(isNote, csId, pdfName, pdfUrl, description, collegeName, isPyq);

        if (isNote && (!csId || !pdfName || !pdfUrl || !description)) SweetAlert('All fields Mandatory', 'warning');
        if (!isNote && (!csId || !pdfName || !pdfUrl || !description || !collegeName)) SweetAlert('All fields Mandatory', 'warning');
        else if (!updatableData) {
            if (isNote) uploadNoteApi({ categoryId: csId, pdfName, pdfUrl, description });
            else if (!isNote) uploadPyqClassNotesApi({ subjectId: csId, pdfName, pdfUrl, description, collegeName, isPyq });
        }
        else {
            if (isNote) updateNoteApi({ noteId: updatableData?._id, categoryId: csId, pdfName, pdfUrl, description });
            else if (!isNote) updatePyqClassNotesApi({ pyqId: updatableData?._id, subjectId: csId, pdfName, pdfUrl, description, collegeName, isPyq });
        }
    }
    function handlePyqClassNotesChange(val) {
        if (val === "PYQs") setIsPyq(true);
        else setIsPyq(false);
    }
    function handleNoteOrPyq(boolValue) {
        setIsNote(boolValue);
        updateFieldsAfterSubmit(pdfNameRef, pdfUrlRef, descriptionRef);
        onClear();
    }

    return (
        <div>
            <Modal open={openModal} onClose={onCloseModal} classNames={{ modal: `w-[18rem] sm:w-[30rem] lg:w-[40rem] rounded-lg` }} center>
                <div className='flex flex-col gap-3 m-4 h-[34rem]'>
                    <p className='font-bold mb-1 text-lg'>Select one below</p>
                    <div className='grid grid-cols-2'>
                        <button onClick={() => handleNoteOrPyq(true)} className={`text-[12px] sm:text-[18px] cols-span-2 md:col-span-1 border border-accentOrange rounded-[8px_0_0_8px] py-2 ${isNote ? "bg-accentOrange text-white" : "bg-white text-accentOrange"} `}>Notes</button>
                        <button onClick={() => handleNoteOrPyq(false)} className={`text-[12px] sm:text-[18px] cols-span-2 md:col-span-1 border border-accentOrange rounded-[0_8px_8px_0] py-2 ${!isNote ? "bg-accentOrange text-white" : "bg-white text-accentOrange"}`}>PYQ/Class Notes</button>
                    </div>
                    <hr className='border border-neutral-400' />
                    <form onSubmit={handleSubmit} className={`flex flex-col ${isNote ? "gap-5" : "gap-2"} w-[100%]`}>
                        {!isNote &&
                            <select onChange={(e) => handlePyqClassNotesChange(e.target.value)} className={`focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md cursor-pointer opacity-90`}>
                                <option className='text-neutral-300' value="none" selected disabled hidden>Select One (pyq or class notes) </option>
                                <option value="PYQs" name="type">PYQs</option>
                                <option value="Class Notes" name="type">Class Notes</option>
                            </select>}

                        <Select ref={categoryIdRef} options={isNote ? categories : subjects} placeholder={`Select ${isNote ? "Category" : "Subject"}`} />
                        <input
                            ref={pdfNameRef}
                            defaultValue={updatableData?.pdfName}
                            className=" focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
                            type="text"
                            placeholder={`Topic Name`}
                        />
                        {!isNote &&
                            <select onChange={(e) => setCollegeName(e.target.value)} className={`focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md cursor-pointer opacity-90`}>
                                <option className='text-neutral-300' value="none" selected disabled hidden>Select College</option>
                                <option value="UIT Burdwan, WB" name="type">UIT Burdwan, WB</option>
                                <option value="Other" name="type">Other</option>
                            </select>}

                        <input
                            ref={pdfUrlRef}
                            defaultValue={updatableData?.pdfUrl}
                            className=" focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
                            type="text"
                            placeholder="pdf link (drive link)"
                        />
                        <textarea
                            ref={descriptionRef}
                            defaultValue={updatableData?.description}
                            className="focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
                            rows="4"
                            placeholder="Write description about pdf by which user can find it easily"
                        ></textarea>
                        <button className="border border-gray-600 bg-red-600 text-white py-2 px-3 rounded-md">
                            {updatableData ? "Update" : "Upload"}
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default NoteModal;