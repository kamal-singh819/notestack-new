import { useEffect, useState } from "react";
import commonAxios from '../helper/CommonAxios';
import { useNavigate } from "react-router-dom";
// import LoadingPage from "../components/LoadingPage";
import CardSkeleton from "../components/skeletons/CardSkeleton";

const Articles = () => {
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAllArticlsTitle() {
            const response = await commonAxios({ method: 'get', url: "articles/get-titles" });
            if (response.data.message === "FETCHED") {
                setTitles(response.data.data);
                setIsLoading(false);
            }
        }
        fetchAllArticlsTitle();
    }, []);

    function handleClickArticle(ele) {
        navigate(`/articles/:${ele.title.toLowerCase().split(' ').join('-')}`, { state: { articleId: ele._id } });
    }

    // if (titles.length === 0) {
    //     return <LoadingPage bgColor={"bg-darkColor"} />;
    // }
    return <div className="p-4 md:py-10 sm:px-8 lg:px-[10rem] min-h-[calc(100vh-5rem)] bg-darkColor text-white">
        <h2 className="mb-[4rem] text-center text-2xl font-bold">Learn Articles here</h2>
        <ul className="ms-10">
            {isLoading && <CardSkeleton cards={6} lines={1} width={"18rem"} />}
            {titles.map(ele => <li onClick={() => handleClickArticle(ele)} className=" list-disc cursor-pointer mb-4 text-md md:text-lg hover:text-gray-400 underline underline-offset-4 w-fit" key={ele._id}> {ele.title} </li>)}
        </ul>
    </div>;
};
export default Articles;
