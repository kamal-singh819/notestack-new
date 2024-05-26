import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
// import sideLogo from '../../assets/navImages/logoTwo.png';
const SideLogo = () => {
    return (
        <div className='hidden md:flex p-[1rem] flex-col gap-4 md:w-[20rem]'>
            {/* <div className='w-[8rem] ms-[3rem]'><img className='w-[100%]' src={sideLogo} alt="NoteStack" /></div> */}
            <p className='text-md italic font-bold text-neutral-400'>Get ahead in your studies with NoteStack, offering a diverse range of downloadable PDF notes for students.</p>
            <div className='flex gap-4'>
                <a className='text-neutral-600 duration-300 bg-neutral-300 w-5 rounded-sm flex justify-center py-1 hover:shadow-2xl hover:text-accentPurple' href="#"><FontAwesomeIcon icon={faFacebookF} /> </a>
                <a className='text-neutral-600 duration-300 bg-neutral-300 w-5 rounded-sm flex justify-center py-1 hover:shadow-2xl hover:text-accentPurple' href="#"><FontAwesomeIcon icon={faInstagram} /> </a>
                <a className='text-neutral-600 duration-300 bg-neutral-300 w-5 rounded-sm flex justify-center py-1 hover:shadow-2xl hover:text-accentPurple' href="#"><FontAwesomeIcon icon={faXTwitter} /> </a>
            </div>
        </div>
    )
}
export default SideLogo;