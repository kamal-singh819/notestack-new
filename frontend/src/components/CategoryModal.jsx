import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useRef } from 'react';
import { SweetAlert } from '../helper/SweetAlert';
import commonAxios from '../helper/CommonAxios';

const CategoryModal = ({ setOpenModal, openModal, updatableCategory, setAnyChange }) => {
    const onCloseModal = () => setOpenModal(false);
    const categoryRef = useRef();
    const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
    async function AddCategoryApi(value) {
        try {
            const response = await commonAxios({ method: 'post', url: 'categories/add-category', token: token, data: { categoryName: value } });
            if (response.data.message === 'EXISTS') SweetAlert("Category already exists.", 'warning');
            else if (response.data.message === 'ADDED') {
                setOpenModal(false);
                SweetAlert("Category Added Successfully!", 'success');
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
        const value = categoryRef.current.value.trim();
        if (value && !updatableCategory) AddCategoryApi(value);
        else if (updatableCategory && value) UpdateCategoryApi(updatableCategory, value);
        else SweetAlert("Enter a Category", "warning");
    }

    return (
        <div>
            <Modal open={openModal} onClose={onCloseModal} classNames={{ modal: `w-[18rem] sm:w-[25rem] rounded-lg` }} center>
                <div className='flex flex-col gap-3 m-4'>
                    <h2 className='text-xl font-semibold mb-4'>{updatableCategory ? "Update" : "Add New"} Category</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <input ref={categoryRef} defaultValue={updatableCategory?.categoryName} className='focus:outline-none border-2 border-black rounded-md px-3 py-2' type="text" placeholder='e.g. JavaScript' />
                        <button className='bg-red-400 duration-300 ease-in hover:bg-red-600 text-white py-2 px-3 rounded-md'> {updatableCategory ? "UPDATE" : "ADD"}</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default CategoryModal;