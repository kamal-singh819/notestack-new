import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useRef } from 'react';
import { SweetAlert } from '../../helper/SweetAlert';
import commonAxios from '../../helper/CommonAxios';

const RequestContributionModal = ({ setOpenModal, openModal }) => {
    const onCloseModal = () => setOpenModal(false);
    const skillsRef = useRef();
    const whyRef = useRef();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    async function contributionRequestApi(skills, message) {
        try {
            const response = await commonAxios({ method: 'post', url: `requests/to-be-contributor`, token: userInfo?.accessToken, data: { reqType: "contributor-request", skills: skills, message: message } });
            if (response.data.message === 'MISSING') SweetAlert("User is missing", 'warning');
            else if (response.data.message === 'EXISTS') SweetAlert("Request is already been sent", 'warning');
            else if (response.data.message === 'SENT') {
                setOpenModal(false);
                SweetAlert("Request Sent!", 'success');
            }
            else SweetAlert("Something went wrong!", 'warning');
        } catch (error) {
            console.log(error);
            SweetAlert('Something went wrong!', 'warning');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (skillsRef.current.value.trim() && whyRef.current.value.trim()) contributionRequestApi(skillsRef.current.value.trim(), whyRef.current.value.trim());
        else SweetAlert("All fields are mandatory", 'warning');
    }

    return (
        <div>
            <Modal open={openModal} onClose={onCloseModal} classNames={{ modal: `w-[18rem] sm:w-[30rem] rounded-lg` }} center>
                <div className='flex flex-col gap-3 m-4'>
                    <p className='font-bold mb-1 text-lg'>Fill this form carefully</p>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <label className='text-gray-500'>Email</label>
                        <input defaultValue={userInfo?.email} className='focus:outline-none border border-black rounded-md px-3 py-2 mb-2' type="text" readOnly />
                        <label className='text-gray-500'>Skills</label>
                        <textarea className='border border-black rounded-md px-3 py-2 mb-2' ref={skillsRef} placeholder='Enter Skills Comma separated e.g. Java,Python..soon'></textarea>
                        <label className='text-gray-500'>Give a reason</label>
                        <textarea className='border border-black rounded-md px-3 py-2 mb-2' ref={whyRef} placeholder='Write 1-2 line why you want to be a contributor?'></textarea>
                        <button className='bg-red-500 duration-300 ease-in hover:bg-red-600 text-white py-2 px-3 rounded-md'> {"Submit Request"}</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default RequestContributionModal;