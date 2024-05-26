import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commonAxios from "../helper/CommonAxios";
import { useUserHook } from '../contexts/UserContext';
const YourContributions = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [articles, setArticles] = useState([]);
    const { profileData } = useUserHook();
    useEffect(() => {
        async function getArticles() {
            const response = await commonAxios({ method: "get", url: `articles/get-titles/?adminId=${profileData?._id}`, token: userInfo?.accessToken });
            if (response.data.message === "FETCHED") setArticles(response.data.data);
        }
        getArticles();
    }, []);

    function handleClickArticle(ele) {
        navigate(`/articles/:${ele.title.toLowerCase().split(' ').join('-')}`, { state: { articleId: ele._id } });
    }
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
                <div className="bg-white rounded-md shadow-2xl sm:w-1/3 p-5 flex flex-col items-center">
                    <span className="text-lg front-bold">Articles</span>
                    <h2 className="text-6xl font-semibold">{articles.length}</h2>
                </div>
                <div className="bg-white rounded-md shadow-2xl sm:w-1/3 p-5 flex flex-col items-center">
                    <span className="text-lg front-bold">Notes</span>
                    <h2 className="text-6xl font-semibold">{0}</h2>
                </div>
                <div className="bg-white rounded-md shadow-2xl sm:w-1/3 p-5 flex flex-col items-center">
                    <span className="text-lg front-bold">Class Notes</span>
                    <h2 className="text-6xl font-semibold">{0}</h2>
                </div>
            </div>
            <div className=" my-3 text-white">
                <p className="text-xl font-bold mb-2"> Articles List</p>
                {articles.length && <ul className="flex flex-col gap-2 list-disc ps-4 text-white">
                    {articles.map(ele => <li key={ele._id} onClick={() => handleClickArticle(ele)} className="cursor-pointer w-fit underline">{ele.title}</li>)}
                </ul>}
            </div>
        </div>
    )
}

export default YourContributions;
