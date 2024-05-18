import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useRef, useState } from 'react';
import { SweetAlert } from '../helper/SweetAlert';
import commonAxios from '../helper/CommonAxios';

const CategoryModal = ({ setOpenModal, openModal, updatableCategory, setAnyChange }) => {
    const onCloseModal = () => setOpenModal(false);
    const inputRef = useRef();
    const [isCategory, setIsCategory] = useState(true); //by default category
    const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
    async function AddCategoryApi(value) {
        try {
            const response = isCategory ? await commonAxios({ method: 'post', url: 'categories/add-category', token: token, data: { categoryName: value } }) : await commonAxios({ method: 'post', url: 'subjects/add-subject', token: token, data: { subjectName: value } });
            if (response.data.message === 'EXISTS') SweetAlert("Already exists.", 'warning');
            else if (response.data.message === 'ADDED') {
                setOpenModal(false);
                SweetAlert("Added Successfully!", 'success');
            }
            else SweetAlert("Something went wrong!", 'warning');
        } catch (error) {
            console.log(error);
            SweetAlert('Something went wrong!', 'warning');
        }
    }
    async function UpdateCategoryApi(updatableCategory, value) {
        try {
            const response = await commonAxios({ method: 'put', url: `categories/update-category/?id=${updatableCategory._id}`, token: token, data: { categoryName: value } });
            if (response.data.message === 'MISSING') SweetAlert("Can't Update", 'warning');
            else if (response.data.message === 'EXISTS') SweetAlert("Category already exists.", 'warning');
            else if (response.data.message === 'UPDATED') {
                setOpenModal(false);
                setAnyChange(prev => !prev);
                SweetAlert("Category Updated Successfully!", 'success');
            }
            else SweetAlert("Something went wrong!", 'warning');
        } catch (error) {
            console.log(error);
            SweetAlert('Something went wrong!', 'warning');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const value = inputRef.current.value.trim();
        if (value && !updatableCategory) AddCategoryApi(value);
        else if (updatableCategory && value) UpdateCategoryApi(updatableCategory, value);
        else SweetAlert("Enter a Category", "warning");
    }
    function handleCategoryOrSubject(boolValue) {
        setIsCategory(boolValue);
        inputRef.current.value = '';
    }

    return (
        <div>
            <Modal open={openModal} onClose={onCloseModal} classNames={{ modal: `w-[18rem] sm:w-[30rem] rounded-lg` }} center>
                <div className='flex flex-col gap-3 m-4'>
                    <p className='font-bold mb-1 text-lg'>Select one below</p>
                    <div className='grid grid-cols-2'>
                        <button onClick={() => handleCategoryOrSubject(true)} className={`text-[12px] sm:text-[18px] cols-span-2 md:col-span-1 border border-accentOrange rounded-[8px_0_0_8px] py-2 ${isCategory ? "bg-accentOrange text-white" : "bg-white text-accentOrange"} `}>Category</button>
                        <button onClick={() => handleCategoryOrSubject(false)} className={`text-[12px] sm:text-[18px] cols-span-2 md:col-span-1 border border-accentOrange rounded-[0_8px_8px_0] py-2 ${!isCategory ? "bg-accentOrange text-white" : "bg-white text-accentOrange"}`}>Subject (for college)</button>
                    </div>
                    <hr className='border border-neutral-400' />
                    <p className='text-xl font-bold'>Enter a {isCategory ? "Category" : "Subject"}</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <input ref={inputRef} defaultValue={updatableCategory?.categoryName} className='focus:outline-none border-2 border-black rounded-md px-3 py-2' type="text" placeholder={isCategory ? "Category Name" : "Subject Name"} />
                        <button className='bg-red-500 duration-300 ease-in hover:bg-red-600 text-white py-2 px-3 rounded-md'> {updatableCategory ? "UPDATE" : "ADD"}</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default CategoryModal;