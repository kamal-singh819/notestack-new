import React, { useState, useRef } from 'react';
import Toolbar from '../components/Toolbar';
import ContentBlock from '../components/ContentBlock';
import commonAxios from '../helper/CommonAxios';
import { Notify } from '../helper/HotToast';

const ArticleEditor = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const [content, setContent] = useState([]);
    const titleRef = useRef();

    const addContentBlock = (type) => {
        setContent([...content, { type, text: '', id: Date.now() }]);
    };

    const updateContentBlock = (id, newText) => {
        setContent(content.map(block => block.id === id ? { ...block, text: newText } : block));
    };

    async function handlePublishArticle() {
        const title = titleRef.current.value.trim();
        if (!content.length || !title) return;
        const article = JSON.stringify(content);
        try {
            const response = await commonAxios({ method: 'post', url: 'articles/publish-article', token: userInfo?.accessToken, data: { title, content: article } });
            if (response.data.message === 'CREATED') Notify("Article Published Successfully", 'success');
            else Notify("Article can't published", 'error');
        } catch (error) {
            Notify("Something went wrong", 'error');
        }
    }

    return (
        <div className='px-2 sm:px-4 lg:px-6 xl:px-20 flex gap-4 mt-10'>
            <div className='flex flex-col gap-4 w-full'>
                <input className='py-2 px-3 rounded-md' ref={titleRef} type="text" placeholder='Write title to your article' />
                <div className='flex flex-col gap-3'>
                    {content.map(block => (
                        <ContentBlock
                            key={block.id}
                            type={block.type}
                            text={block.text}
                            id={block.id}
                            updateContentBlock={updateContentBlock}
                        />
                    ))}
                </div>
                <div className='flex justify-center'><button onClick={handlePublishArticle} className='border bg-purple-600 text-white rounded-md px-4 py-1'>Publish</button> </div>
            </div>
            <Toolbar addContentBlock={addContentBlock} />
        </div>
    );
};

export default ArticleEditor;

