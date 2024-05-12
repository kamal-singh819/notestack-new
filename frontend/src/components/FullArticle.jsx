import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import commonAxios from "../helper/CommonAxios";
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

    return (
        <div className="p-4 md:p-10 xl:px-32">
            <h2 className="text-2xl font-bold text-center">{article?.title}</h2>
            <div className="flex flex-col gap-4">
                {content.map(list => {
                    if (list.type === "header") return <p key={list.id} className="font-semibold text-xl">{list.data?.text}</p>
                    else if (list.type === "paragraph") return <p key={list.id} className="text-md">{list.data?.text}</p>
                    else return <div key={list.id} style={{ whiteSpace: 'pre-line' }} className="text-sm border border-neutral-400 p-2 sm:p-4 bg-neutral-300">{list.data?.code}</div>
                })}
            </div>
        </div>
    )
}

export default FullArticle;
