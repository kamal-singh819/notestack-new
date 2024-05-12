import { useEffect, useState } from "react";
import commonAxios from '../helper/CommonAxios';
import { useNavigate } from "react-router-dom";

const Articles = () => {
    const [titles, setTitles] = useState([]);
    const navigate = useNavigate();

    function handleClickArticle(ele) {
        navigate(`/articles/:${ele.title.toLowerCase().split(' ').join('-')}`, { state: { articleId: ele._id } });
    }

    useEffect(() => {
        async function fetchAllArticlsTitle() {
            const response = await commonAxios({ method: 'get', url: "articles/get-titles" });
            if (response.data.message === "FETCHED") setTitles(response.data.data);
        }
        fetchAllArticlsTitle();
    }, []);
    return <div className="p-4 md:p-10 xl:px-32 min-h-[calc(100vh-5rem)] bg-darkColor text-white">
        <h2 className="mb-5 text-center text-2xl font-bold">Learn Articles here</h2>
        <ul className="ms-10">
            {titles.map(ele => <li onClick={() => handleClickArticle(ele)} className=" list-disc cursor-pointer" key={ele._id}> {ele.title} </li>)}
        </ul>
    </div>;
};
export default Articles;
