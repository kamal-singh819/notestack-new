import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useRef } from 'react';
import { SweetAlert } from '../helper/SweetAlert';
import axios from 'axios';

const AddCategoryModal = ({ setOpenModal, openModal }) => {
    const onCloseModal = () => setOpenModal(false);
    const categoryRef = useRef();
    const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
    async function AddCategoryApi(value) {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:5000/admin/add-category',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { categoryName: value }
        });
        if (response.data.message === 'EXISTS') SweetAlert("Category already exists.", 'warning');
        else if (response.data.message === 'ADDED') {
            setOpenModal(false);
            SweetAlert("Category Added Successfully!", 'success');
        }
        else SweetAlert("Something went wrong!", 'warning');
    }

    function handleSubmit(e) {
        e.preventDefault();
        const value = categoryRef.current.value.trim();
        if (value) AddCategoryApi(value);
        else SweetAlert("Enter a Category", "warning");
    }

    return (
        <div>
            <Modal open={openModal} onClose={onCloseModal} center>
                <div className='flex flex-col gap-3 m-4'>
                    <h2 className='text-xl font-semibold'>Add category</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <input ref={categoryRef} className='focus:outline-none border-2 border-black rounded-md px-3 py-2 w-[18rem]' type="text" placeholder='e.g. JavaScript' />
                        <button className='bg-red-400 duration-300 ease-in hover:bg-red-600 text-white py-2 px-3 rounded-md'> ADD </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AddCategoryModal;