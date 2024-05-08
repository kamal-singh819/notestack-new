import axios from "axios";
import { useEffect, useState } from "react";
import SingleNote from "../components/SingleNote";
import 'react-dropdown/style.css';
import { useLocation } from "react-router-dom";

const DisplayPage = () => {
    const location = useLocation();
    const { categoryId } = location.state;
    const [notes, setNotes] = useState([]);
    const [searched, setSearched] = useState([]);
    useEffect(() => {
        async function getAllNotes() {
            const response = await axios({
                method: 'get',
                url: `http://localhost:5000/notes/get-notes-by-category/?categoryId=${categoryId}`,
            });
            if (response.data.message === 'FETCHED') {
                setNotes(response.data.data);
                setSearched(response.data.data);
            }
        }
        getAllNotes();
    }, []);

    function handleClickAll() {
        setSearched(notes);
    }
    function handleSearch(e) {
        const val = e.target.value.trim();
        setSearched(notes.filter(note => note.pdfName.toLowerCase().includes(val.toLowerCase())));
    }
    function handleLikedWise(value) {
        if (value === 'Most') setSearched(notes.toSorted((a, b) => b.likeCount - a.likeCount));
        else setSearched(notes.toSorted((a, b) => a.likeCount - b.likeCount));
    }

    return (
        <div className='min-h-[calc(100vh-4rem)] bg-darkColor flex flex-col gap-3 px-3 md:px-8 xl:px-20 py-10'>
            <div className="flex w-full justify-center mb-5">
                <input onChange={handleSearch} className="w-full sm:w-[80%] py-2 ps-5 rounded-full focus:outline-none" type="search" placeholder="Search here..." />
            </div>
            <div className="flex flex-col gap-3 mb-5">
                <p className="text-white">Filter Options</p>
                <div className="flex flex-col md:flex-row gap-3">
                    <button onClick={handleClickAll} className="bg-white text-black rounded-full px-4 py-1">All</button>
                    <button onClick={() => handleLikedWise("Most")} className="bg-white text-black rounded-full px-4 py-1">Most Liked</button>
                    <button onClick={() => handleLikedWise("Least")} className="bg-white text-black rounded-full px-4 py-1">Least Liked</button>
                    {/* <Select className="w-[18rem]" onChange={handleFilterLikes} options={likesOptions} placeholder="Sort by Likes" /> */}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searched.map(note => <SingleNote key={note._id} note={note} />)}
            </div>
        </div>
    )
}

export default DisplayPage;
