import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchAllCategories() {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:5000/categories/get-all-categories'
            });
            if (response.data.message === 'FETCHED') setCategories(response.data.data);
        }
        fetchAllCategories();
    }, []);

    function handleNoteListClick(ele) {
        navigate(`/notes/:${ele.categoryName.toLowerCase()}`, { state: { categoryId: ele._id } });
    }

    return (
        <div className="p-5 md:p-10 bg-darkColor flex flex-col md:flex-row md:justify-around gap-5">
            <div>
                <p className="mb-5 text-2xl font-bold text-white">Notes List</p>
                <ul className="flex flex-col gap-4 p-4">
                    {categories.map(ele => <li key={ele._id} onClick={() => handleNoteListClick(ele)} className="list-disc font-semibold text-white after:content-[''] after:block after:w-[0] after:h-[2px] after:bg-white after:transition-[width] after:duration-[0.3s] hover:after:w-[100%] hover:after:transition-[width] hover:after:duration-[0.3s] cursor-pointer"> {ele.categoryName} </li>)}
                </ul>
            </div>
            <div>
                <p className="mb-5 text-2xl font-bold text-white">PYQs</p>
                <ul className="flex flex-col gap-4 p-4">
                    <li className="list-disc font-semibold text-white after:content-[''] after:block after:w-[0] after:h-[2px] after:bg-white after:transition-[width] after:duration-[0.3s] hover:after:w-[100%] hover:after:transition-[width] hover:after:duration-[0.3s] cursor-pointer"> UIT Burdwan, WB</li>
                </ul>
            </div>
        </div>
    )
}

export default Notes;