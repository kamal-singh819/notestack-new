import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import commonAxios from "../helper/CommonAxios";
const FullArticle = () => {
    const location = useLocation();
    const { articleId } = location.state;
    const [article, setArticle] = useState();

    useEffect(() => {
        async function fetchArticleContent() {
            const response = await commonAxios({ method: 'get', url: `articles/fetch-article/?articleId=${articleId}` });
            console.log(JSON.parse(response.data.data.content));
            if (response.data.message === "FETCHED") setArticle(response.data.data);
        }
        fetchArticleContent();
    }, [])

    return (
        <div>
            <h2 className="text-2xl font-bold">hlo</h2>
            <div>

            </div>
        </div>
    )
}

export default FullArticle;
