import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { GrDocumentNotes } from 'react-icons/gr';
const Footer = () => {
    function handleFooterSubmit(e) {
        e.preventDefault();
    }

    return (
        <footer className="bg-black p-4 sm:px-8 lg:px-[10rem] py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="col-span-1">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 md:mr-8 cursor-pointer">
                            <GrDocumentNotes className="text-white" />
                            <h3 className="text-white font-bold">NOTESTACK</h3>
                        </div>
                        <div className="flex gap-4">
                            <FaInstagram className=" cursor-pointer md:text-[1.2rem] text-neutral-400 transition-all duration-300 ease-in hover:text-white" />
                            <FaFacebook className=" cursor-pointer md:text-[1.2rem] text-neutral-400 transition-all duration-300 ease-in hover:text-white" />
                            <FaXTwitter className=" cursor-pointer md:text-[1.2rem] text-neutral-400 transition-all duration-300 ease-in hover:text-white" />
                            <FaGithub className=" cursor-pointer md:text-[1.2rem] text-neutral-400 transition-all duration-300 ease-in hover:text-white" />
                        </div>
                    </div>
                    <p className=" text-gray-600 mt-4">Welcome to <span className=" text-gray-400">NoteStack</span>, your go-to destination for accessing a treasure trove of knowledge in the realm of computer science. At <span className=" text-gray-400">NoteStack</span>, we strive to empower individuals with the tools and resources they need to excel in their academic and professional endeavors.</p>
                </div>
                <div className="col-span-1 ">
                    <form onSubmit={handleFooterSubmit} className="flex flex-col gap-3 w-full">
                        <input type="email" placeholder="Email" className="p-2 rounded-md focus:outline-none text-sm sm:text-lg bg-gray-200" />
                        <textarea className="p-2 w-full rounded-md focus:outline-none text-sm sm:text-lg bg-gray-200" placeholder="Message"></textarea>
                        <button className="p-2 border-2 border-white text-white rounded-md w-[8rem] font-semibold transition-all ease-in duration-300 hover:bg-white hover:text-black" type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <hr className="bg-neutral-300 border-none h-[1px] my-4" />
            <p className="text-neutral-400 mt-4">&copy; NoteStack, Inc. All Rights Reserved.</p>
        </footer>
    )
}
export default Footer;