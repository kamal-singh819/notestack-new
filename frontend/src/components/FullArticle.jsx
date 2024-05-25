import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import commonAxios from "../helper/CommonAxios";
// import LoadingPage from "./LoadingPage";
// import CardSkeleton from "./CardSkeleton";
import { ArticleSkeleton, ArticleProfileSkeleton } from '../components/skeletons/CardSkeleton';
import KamalSingh from '../assets/homeImages/kamal.jpg';

const FullArticle = () => {
    const location = useLocation();
    const { articleId } = location.state;
    const [article, setArticle] = useState(null);
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchArticleContent() {
            const response = await commonAxios({ method: 'get', url: `articles/fetch-article/?articleId=${articleId}` });
            if (response.data.message === "FETCHED") {
                setArticle(response.data.data);
                setContent(JSON.parse(response.data.data.content));
                setIsLoading(false);
            }
        }
        fetchArticleContent();
    }, []);

    // if (content.length === 0) return <LoadingPage bgColor={"bg-white"} />
    return (
        <div className="grid grid-cols-6 gap-6 sm:gap3 p-6 sm:px-8 md:px-20 xl:px-[10rem] py-10 min-h-[calc(100vh-5rem)]">
            <div className="col-span-6 sm:col-span-4  bg-[#1d3557] py-6 px-3 rounded-xl text-white">
                {isLoading && <ArticleSkeleton />}
                <h2 className="text-2xl font-bold text-center">{article?.title}</h2>
                <div className="flex flex-col gap-4 mt-8">
                    {content.map(list => {
                        if (list.type === "header") return <p key={list?.id} className="font-semibold text-xl">{list.data?.text}</p>
                        else if (list.type === "paragraph") return <p key={list?.id} className="text-md">{list.data?.text}</p>
                        else return <div key={list?.id} style={{ whiteSpace: 'pre-line' }} className="text-sm border border-neutral-400 p-2 sm:p-4 bg-cardBgColor text-gray-300 rounded-md">{list.data?.code}</div>
                    })}
                </div>
            </div>
            <div className="col-span-6 sm:col-span-2 bg-[#1d3557] h-[18rem] py-6 px-3 rounded-xl flex flex-col gap-3 items-center">
                {isLoading && <ArticleProfileSkeleton />}
                {!isLoading &&
                    <>
                        <div> <img className="w-20 h-20 rounded-full" src={KamalSingh} alt="Writter" /></div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white text-2xl font-mono">{article?.adminId?.name}</h4>
                            <p className="text-white">{article?.adminId?.email}</p>
                            <p className="text-white">+91{article?.adminId?.phone}</p>
                        </div>
                    </>}
            </div>
        </div >
    )
}

export default FullArticle;
