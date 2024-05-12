import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import Code from '@editorjs/code';
import commonAxios from '../helper/CommonAxios';
import { SweetAlert } from '../helper/SweetAlert';
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const DEFAULT_INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "Writing Start from here(first clear me)",
                "level": 1
            }
        },
    ]
}

const RichTextEditor = () => {
    const ejInstance = useRef();
    const titleRef = useRef();
    const [data, setData] = useState(null);

    async function postArticlesApi(title, content) {
        try {
            const response = await commonAxios({ method: 'post', url: 'articles/publish-article', token: userInfo?.accessToken, data: { title, content } });
            console.log(response);
            if (response.data.message === 'CREATED') SweetAlert("Article Published", 'success');
            else SweetAlert("Something went wrong", 'warning');
        } catch (error) {
            SweetAlert("Something went wrong", 'warning');
        }
    }

    function handlePublish() {
        console.log(titleRef.current.value);
        console.log(JSON.stringify(data));
        postArticlesApi(titleRef.current.value.trim(), JSON.stringify(data));
    }

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            data: DEFAULT_INITIAL_DATA,
            onChange: async () => {
                let content = await editor.saver.save();
                console.log(content);
                setData(content.blocks);
            },
            tools: {
                header: Header,
                code: Code
            },
        });
    };

    // This will run only once
    useEffect(() => {
        if (ejInstance.current === null) {
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    return (<div className="flex flex-col justify-center items-center">
        <div className="flex justify-center mb-4"><h2 className="text-white font-bold text-2xl">Write Articles here</h2></div>
        <input ref={titleRef} className="w-[95vw]  md:w-[80vw] p-2 md:p-4 rounded-md text-2xl" type="text" placeholder="Title (minimum 50 letters)" />
        <div className="border-2 border-black bg-white m-5 mt-2 w-[95vw] md:w-[80vw] rounded-md p-2" id='editorjs'></div>
        <button onClick={handlePublish} className=" text-accentOrange bg-white max-w-[15rem] px-10 py-2 rounded-md">Publish</button>
    </div>);
}

export default RichTextEditor;