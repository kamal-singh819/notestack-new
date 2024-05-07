import axios from "axios";
import { useEffect, useState } from "react";
import SingleNote from "../components/SingleNote";
import Select from 'react-select';
import 'react-dropdown/style.css';
import { likesOptions, subjectOptions } from "../helper/data";

const DisplayPage = () => {
    const [notes, setNotes] = useState([]);
    const [searched, setSearched] = useState([]);
    useEffect(() => {
        async function getAllNotes() {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:5000/notes/get-all-notes',
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
        setSearched(notes.filter(note => note.subject.toLowerCase().includes(val.toLowerCase()) || note.pdfName.toLowerCase().includes(val.toLowerCase())));
    }
    function handleFilterSubject(e) {
        setSearched(notes.filter(note => note.subject === e.value));
    }
    function handleFilterLikes(e) {
        if (e.value === 'Acending') setSearched(notes.toSorted((a, b) => a.likeCount - b.likeCount));
        else setSearched(notes.toSorted((a, b) => b.likeCount - a.likeCount));
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
                    <Select className="w-[18rem]" onChange={handleFilterSubject} options={subjectOptions} placeholder="Filter by Subject" />
                    <Select className="w-[18rem]" onChange={handleFilterLikes} options={likesOptions} placeholder="Sort by Likes" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searched.map(note => <SingleNote key={note._id} note={note} />)}
            </div>
        </div>
    )
}

export default DisplayPage;
