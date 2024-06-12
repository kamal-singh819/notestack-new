import React, { useState, useRef } from 'react';
import Toolbar from '../components/Toolbar';
import ContentBlock from '../components/ContentBlock';
import commonAxios from '../helper/CommonAxios';
import { SweetAlert } from '../helper/SweetAlert';

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
        console.log(title, article);
        try {
            const response = await commonAxios({ method: 'post', url: 'articles/publish-article', token: userInfo?.accessToken, data: { title, content: article } });
            console.log(response);
            if (response.data.message === 'CREATED') SweetAlert("Article Published", 'success');
            else SweetAlert("Something went wrong", 'warning');
        } catch (error) {
            SweetAlert("Something went wrong", 'warning');
        }
    }

    return (
        <div className='px-2 sm:px-4 lg:px-6 xl:px-20 flex flex-col gap-4'>
            <Toolbar addContentBlock={addContentBlock} />
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
            <button onClick={handlePublishArticle} className='border bg-purple-600 text-white rounded-md px-4 py-1'>Publish</button>
        </div>
    );
};

export default ArticleEditor;

