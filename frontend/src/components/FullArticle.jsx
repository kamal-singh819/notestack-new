import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import commonAxios from "../helper/CommonAxios";
// import LoadingPage from "./LoadingPage";
// import CardSkeleton from "./CardSkeleton";
import { ArticleSkeleton, ArticleProfileSkeleton } from '../components/skeletons/CardSkeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import errorProfile from '../assets/errorProfile.png';
import { baseCdnUrl } from "../helper/CommonAxios";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Notify } from "../helper/HotToast";

const FullArticle = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const location = useLocation();
    const { articleId } = location.state;
    const [article, setArticle] = useState(null);
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editableId, setEditableId] = useState(null);
    const [isContentChanged, setIsContentChanged] = useState(false);
    const editableRef = useRef(null);

    useEffect(() => {
        async function fetchArticleContent() {
            const response = await commonAxios({ method: 'get', url: `articles/fetch-article/?articleId=${articleId}` });
            if (response.data.message === "FETCHED") {
                setArticle(response.data.data);
                setContent(JSON.parse(response.data.data?.content));
                setIsLoading(false);
            }
        }
        fetchArticleContent();
    }, []);

    function handleDoubleClick(id) {
        Notify("Now you can edit", "success");
        setEditableId(id);
    }

    function handleBlur(itemId) {
        setEditableId(null);
        const newText = editableRef.current.innerText;
        setContent(prev =>
            prev.map(item =>
                item.id === itemId ? { id: item.id, type: item.type, text: newText } : item
            )
        );
        setIsContentChanged(true);
    }
    async function handleSaveChanges() {
        if (isContentChanged) {
            const response = await commonAxios({ method: "put", url: `articles/update-article/?articleId=${articleId}`, token: userInfo?.accessToken, data: { title: article.title, content: JSON.stringify(content) } });
            if (response.data.message === 'UPDATED') Notify("Acticle Updated Successfully", "success");
            else Notify("Article didn't updated", "error");
            setIsContentChanged(false);
        }
        else Notify("Nothing to update", "error");
    }

    return (
        <div className="grid grid-cols-6 gap-6 sm:gap3 p-6 sm:px-8 md:px-20 xl:px-[10rem] py-10 min-h-[calc(100vh-5rem)]">
            <div className="col-span-6 sm:col-span-4  bg-[#1d3557] py-6 px-3 rounded-xl text-white">
                {isLoading && <ArticleSkeleton />}
                <h2 className="text-2xl font-bold text-center">{article?.title}</h2>
                <div style={{ whiteSpace: "pre-wrap" }} className="flex flex-col gap-3 mt-8">
                    {!isLoading && content.map(ele => <div key={ele.id}
                        ref={editableId === ele.id ? editableRef : null}
                        onDoubleClick={userInfo?.role === 'Admin' ? () => handleDoubleClick(ele.id) : null}
                        onBlur={() => handleBlur(ele.id)}
                        contentEditable={userInfo?.role === 'Admin' && editableId === ele.id}
                        suppressContentEditableWarning={true}
                        className={`${ele.type === 'code' ? 'text-sm' : ele.type === 'p' ? 'text-base text-gray-400' : ele.type === 'h1' ? "text-2xl text-gray-100" : ele.type === "h2" ? "text-xl text-gray-200" : "text-lg text-gray-300"}`}
                    >
                        {ele.type === 'code' ? <SyntaxHighlighter children={ele.text} language="javascript" style={dracula}></SyntaxHighlighter> : ele.text}
                    </div>
                    )}
                </div>
                {isContentChanged && (<div className="flex justify-end mt-4"><button onClick={handleSaveChanges} className=" bg-accentPurple rounded-md px-3 py-1 text-white">
                    Save Changes
                </button> </div>
                )}

            </div>
            <div className="col-span-6 sm:col-span-2 bg-[#1d3557] h-[18rem] py-6 px-3 rounded-xl flex flex-col gap-3 items-center">
                {isLoading && <ArticleProfileSkeleton />}
                {!isLoading &&
                    <>
                        <LazyLoadImage className="w-20 aspect-square rounded-full bg-white" onError={(curr) => curr.target.src = errorProfile} src={`${baseCdnUrl}${article?.adminId?.imageUrl}`} alt="profile" />
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
