import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commonAxios from "../helper/CommonAxios";
import CategoryModal from "../components/CategoryModal";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SweetAlert } from "../helper/SweetAlert";
// import LoadingPage from "../components/LoadingPage";
import CardSkeleton from "../components/CardSkeleton";

const Notes = () => {
    const [categories, setCategories] = useState([]);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [updatableCategory, setUpdatableCategory] = useState(null);
    const [anyChange, setAnyChange] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
    useEffect(() => {
        async function fetchAllCategories() {
            try {
                const response = await commonAxios({ method: 'get', url: 'categories/get-all-categories' });
                if (response.data.message === 'FETCHED') {
                    setCategories(response.data.data);
                    setIsLoading(false);
                }
            } catch (error) {
                SweetAlert("Something went wrong", 'warning');
            }
        }
        fetchAllCategories();
    }, [anyChange]);

    async function deleteCategoryApi(id) {
        try {
            const response = await commonAxios({ method: 'delete', url: `categories/delete-category/?id=${id}`, token: userInfo?.accessToken });
            if (response.data.message === 'MISSING') SweetAlert("Can't delete", 'warning');
            else if (response.data.message === 'DELETED') {
                setAnyChange(prev => !prev);
                SweetAlert("Category Updated Successfully!", 'success');
            }
            else SweetAlert("Something went wrong!", 'warning');
        } catch (error) {
            SweetAlert("Something went wrong", 'warning');
        }
    }

    function handleNoteListClick(ele) {
        if (ele === "UIT-BU-WB") navigate(`/notes/:uit-bu-wb`, { state: { categoryId: "uit-bu-wb" } });
        else navigate(`/notes/:${ele.categoryName.split(' ').join('-').toLowerCase()}`, { state: { categoryId: ele._id } });
    }
    function handleUpdateCategory(category) {
        setUpdatableCategory(category);
        setOpenCategoryModal(true);
    }
    function handleDeleteCategory(category) {
        deleteCategoryApi(category._id);
    }

    // if (categories.length === 0) return <LoadingPage bgColor={"bg-darkColor"} />

    return (
        <div className="p-4 md:py-10 sm:px-8 lg:px-[10rem] bg-darkColor grid grid-cols-1 md:grid-cols-3 gap-10  min-h-[calc(100vh-5rem)]">
            <div className=" col-span-1 md:col-span-2">
                <p className="mb-10 text-2xl font-bold text-white text-center">Notes List</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {isLoading && <CardSkeleton cards={12} lines={2} />}
                    {categories?.map(ele => <div key={ele._id} className=" col-span-1 flex flex-col justify-between gap-3 border-2 border-white p-3 px-5 rounded-md">
                        <span onClick={() => handleNoteListClick(ele)} className="text-white cursor-pointer">{ele.categoryName}</span>
                        {(userInfo && userInfo.isAdmin) && <div className="flex gap-3">
                            <FaEdit onClick={() => handleUpdateCategory(ele)} className="text-white cursor-pointer" />
                            <MdDelete onClick={() => handleDeleteCategory(ele)} className="text-white cursor-pointer" />
                        </div>}
                    </div>
                    )}
                </div>
            </div>
            <div className="col-span-1">
                <p className="mb-10 text-2xl font-bold text-white text-center">PYQs & Class Notes</p>
                <div className="grid grid-cols-1 gap-4">
                    {isLoading ? <CardSkeleton cards={4} lines={1} /> :
                        <div className="col-span-1 flex flex-col justify-between gap-3 border-2 border-white p-3 px-5 rounded-md">
                            <span onClick={() => handleNoteListClick("UIT-BU-WB")} className="text-white cursor-pointer">UIT Burdwan, WB</span>
                            {(userInfo && userInfo.isAdmin) && <div className="flex gap-3">
                                <FaEdit className="text-white" />
                                <MdDelete className="text-white" />
                            </div>}
                        </div>}
                </div>
            </div>
            {updatableCategory && <CategoryModal setOpenModal={setOpenCategoryModal} openModal={openCategoryModal} updatableCategory={updatableCategory} setAnyChange={setAnyChange} />}
        </div>
    )
}

export default Notes;