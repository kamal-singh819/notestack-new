import { useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import commonAxios from '../../helper/CommonAxios';
import { SweetAlert } from '../../helper/SweetAlert';
import YourContributions from '../../components/YourContributions';
import { baseCdnUrl } from '../../helper/CommonAxios';
import errorProfile from '../../assets/errorProfile.png';
import { useUserHook } from '../../contexts/UserContext';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(null); //uploaded image
    const nameRef = useRef();
    const phoneRef = useRef();
    const linkedinRef = useRef();
    const githubRef = useRef();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { profileData, setProfileData } = useUserHook();

    async function updateProfileApi(imageUrl, name, phone, linkedin, github) {
        const formData = new FormData();
        imageUrl && formData.append("image", imageUrl);
        name && formData.append("name", name);
        phone && formData.append("phone", phone);
        linkedin && formData.append("linkedin", linkedin);
        github && formData.append("github", github);
        const response = await commonAxios({ method: 'put', url: `users/update-profile/?userId=${userInfo?.userId}`, data: formData, token: userInfo?.accessToken, isFile: true });
        if (response.status === 201) {
            setProfileData(response.data.data);
            SweetAlert("Updated", "success");
        }
        else SweetAlert("Something wrong", "warning");
    }
    function handleSaveChanges(e) {
        e.preventDefault();
        const name = nameRef.current.value.trim();
        const phone = phoneRef.current.value.trim();
        const linkedin = linkedinRef.current.value.trim();
        const github = githubRef.current.value.trim();
        if (!name && !phone && !linkedin && !github && !profileImage) {
            SweetAlert("Already Updated", "Success");
            return;
        }
        updateProfileApi(profileImage, name, phone, linkedin, github);
    }
    return (
        <div className="p-4 sm:px-8 lg:px-[10rem] py-[4rem] xl:py-[7rem]">
            <form onSubmit={handleSaveChanges} className='grid grid-cols-5 bg-accentPurple p-4 rounded-md'>
                <div className='col-span-5 sm:col-span-2 flex flex-col items-center justify-between pt-3'>
                    <div className='flex flex-col items-center relative'>
                        <LazyLoadImage className="w-48 aspect-square rounded-full bg-white" onError={(curr) => curr.target.src = errorProfile} src={profileImage ? URL.createObjectURL(profileImage) : `${baseCdnUrl}${profileData?.imageUrl}`} alt="profile" />
                        <input onChange={(e) => setProfileImage(e.target.files[0])} type="file" name="uploadfile" id="img" className="hidden" />
                        <label htmlFor="img" className="border p-2 bg-white rounded-full text-accentOrange cursor-pointer absolute bottom-0 left-4"><MdOutlineModeEdit className='font-bold text-xl' /></label>
                    </div>
                    <div className='flex gap-2 items-center text-white cursor-pointer mt-4'>
                        <MdLogout className='text-lg -rotate-90' />
                        <button className=''>Logout</button>
                    </div>
                </div>
                <div className='col-span-5 sm:col-span-3 text-white flex flex-col gap-2'>
                    <div className=' flex flex-col gap-1'>
                        <label htmlFor="name">Name </label>
                        <input ref={nameRef} defaultValue={profileData?.name} className='focus:outline-none text-black border border-neutral-700 px-3 py-2 rounded-lg' type="text" placeholder='e.g. John' />
                    </div>
                    <div className=' flex flex-col gap-1'>
                        <label htmlFor="email">Email</label>
                        <input defaultValue={profileData?.email} className='focus:outline-none text-black border border-neutral-700 px-3 py-2 rounded-lg' type="email" readOnly />
                    </div>
                    <div className=' flex flex-col gap-1'>
                        <label htmlFor="phone">Phone</label>
                        <input ref={phoneRef} defaultValue={profileData?.phone} className='focus:outline-none text-black border border-neutral-700 px-3 py-2 rounded-lg' type="tel" placeholder='e.g. 8192XXXXXX' />
                    </div>
                    <div className=' flex flex-col gap-1'>
                        <label htmlFor="role">Role</label>
                        <input defaultValue={profileData?.role} className='focus:outline-none text-black border border-neutral-700 px-3 py-2 rounded-lg' type="text" readOnly />
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='col-span-2 lg:col-span-1 flex flex-col gap-1'>
                            <label htmlFor="role">LinkedIn</label>
                            <input defaultValue={profileData?.linkedin} ref={linkedinRef} className='focus:outline-none text-black border border-neutral-700 px-3 py-2 rounded-lg w-full' type="text" placeholder="linkedIn profile url" />
                        </div>
                        <div className='col-span-2 lg:col-span-1 flex flex-col gap-1'>
                            <label htmlFor="role">Github</label>
                            <input defaultValue={profileData?.github} ref={githubRef} className='focus:outline-none text-black border border-neutral-700 px-3 py-2 rounded-lg w-full' type="text" placeholder="github profile url" />
                        </div>
                    </div>
                    <button className='border bg-white text-accentOrange rounded-lg px-4 p-2 font-bold w-fit mt-2'>Save Changes</button>
                </div>
            </form>
            {(userInfo?.role === "Admin" || userInfo?.role === "Contributer") && <div className='mt-5 bg-accentPurple p-4 rounded-md'>
                <h2 className='text-3xl mb-3 text-white'>Your Contributions</h2>
                <YourContributions />
            </div>}
            {userInfo?.role === "Admin" && <div>
                <h2>List of Contributers</h2>
            </div>}
        </div>
    );
};

export default Profile;
