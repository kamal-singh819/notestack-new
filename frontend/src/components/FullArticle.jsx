import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import commonAxios from "../helper/CommonAxios";
import LoadingPage from "./LoadingPage";

const FullArticle = () => {
    const location = useLocation();
    const { articleId } = location.state;
    const [article, setArticle] = useState(null);
    const [content, setContent] = useState([]);

    useEffect(() => {
        async function fetchArticleContent() {
            const response = await commonAxios({ method: 'get', url: `articles/fetch-article/?articleId=${articleId}` });
            if (response.data.message === "FETCHED") {
                setArticle(response.data.data);
                setContent(JSON.parse(response.data.data.content));
            }
        }
        fetchArticleContent();
    }, []);

    if (content.length === 0) return <LoadingPage bgColor={"bg-white"} />
    return (
        <div className="p-6 sm:px-8 lg:px-[10rem] py-10 min-h-[calc(100vh-5rem)] bg-darkColor text-white">
            <h2 className="text-2xl font-bold text-center">{article?.title}</h2>
            <div className="flex flex-col gap-4 mt-8">
                {content.map(list => {
                    if (list.type === "header") return <p key={list?.id} className="font-semibold text-xl">{list.data?.text}</p>
                    else if (list.type === "paragraph") return <p key={list?.id} className="text-md">{list.data?.text}</p>
                    else return <div key={list?.id} style={{ whiteSpace: 'pre-line' }} className="text-sm border border-neutral-400 p-2 sm:p-4 bg-cardBgColor text-gray-300 rounded-md">{list.data?.code}</div>
                })}
            </div>
        </div>
    )
}

export default FullArticle;
