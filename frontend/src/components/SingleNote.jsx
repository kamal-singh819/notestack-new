import axios from "axios";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { SweetAlert } from "../helper/SweetAlert";
import { FaEdit } from "react-icons/fa";

const SingleNote = ({ note }) => {
    const [isLiked, setIsLiked] = useState(localStorage.getItem(`liked_${note._id}`) || false);
    const [count, setCount] = useState(note.likeCount || 0);
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
    async function updateLikes(count) {
        try {
            await axios({
                method: 'put',
                url: `http://localhost:5000/notes/like-update/?noteId=${note._id}`,
                data: { likeCount: count }
            });
        } catch (error) {
            console.error(error);
        }
    }

    function handleLikeIt() {
        if (!userInfo) {
            SweetAlert("You are not Logged In.", "warning");
        }
        else if (!localStorage.getItem(`liked_${note._id}`)) {
            localStorage.setItem(`liked_${note._id}`, true);
            setIsLiked(true);
            setCount(count + 1);
            updateLikes(count + 1);
        }
        else {
            localStorage.removeItem(`liked_${note._id}`);
            setIsLiked(false);
            setCount(count - 1);
            updateLikes(count - 1);
        }
    }
    return (
        <div className="flex flex-col justify-between gap-2 border-2 border-neutral-400 bg-cardBgColor transition-all ease-in duration-300 hover:bg-black px-5 py-4 rounded-lg relative" data-aos="fade-up">
            <div className="flex justify-between gap-3 ">
                <p className="text-white text-xl font-semibold">{note.pdfName}</p>
                <p className="text-white italic">{note.subject}</p>
            </div>
            <p className="text-greyColorTwo text-[15px]">{note.description}</p>
            <div className="flex justify-between gap-3">
                <a className="text-white border-b-2 border-white hover:text-blue-300" href={note.pdfUrl} target="_blank" >Download Link</a>
                <p className="text-greyColorOne italic text-sm">{note.updatedAt.substring(0, 10)}</p>
            </div>
            <div className="flex gap-3 items-center">
                <p className="text-white">Give it a like</p>
                <FaHeart onClick={handleLikeIt} className={`cursor-pointer ${isLiked ? "text-red-600" : "text-white"}`} />
                <p className="text-white">{count}</p>
            </div>
            <FaEdit className={`${userInfo && userInfo.isAdmin ? "block" : "hidden"} text-white cursor-pointer md:text-xl absolute bottom-2 right-2`} />
        </div>
    )
}

export default SingleNote;