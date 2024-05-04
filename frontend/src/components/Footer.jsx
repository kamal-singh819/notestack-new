import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { GrDocumentNotes } from 'react-icons/gr';
const Footer = () => {
    return (
        <footer className="bg-cardBgColor p-4 sm:px-8 lg:px-[10rem] py-10">
            <div className="flex flex-col gap-5 md:flex-row justify-between mb-4">
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
                <div className="flex gap-5 sm:gap-20">
                    <div className="flex flex-col gap-3 text-white">
                        <Link to="/notes" className="underline">Notes</Link>
                        <Link to="/articles" className="underline">Articles</Link>
                        <Link className="underline">Services</Link>
                        <Link id="#about" className="underline">About</Link>
                    </div>
                    <div className="flex-1">
                        <form className="flex flex-col gap-3 md:w-[26rem] xl:w-[30rem]">
                            <input type="email" placeholder="Email" className="p-2 rounded-md focus:outline-none text-sm sm:text-lg" />
                            <textarea className="p-2 w-full rounded-md focus:outline-none text-sm sm:text-lg" placeholder="Message"></textarea>
                            <button className="p-2 border-2 border-white text-white rounded-md w-[8rem] font-semibold transition-all ease-in duration-300 hover:bg-white hover:text-black" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <hr className="bg-neutral-300 border-none h-[1px]" />
            <p className="text-neutral-400 mt-4">&copy; NoteStack, Inc. All Rights Reserved.</p>
        </footer>
    )
}
export default Footer;