import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import Code from '@editorjs/code';

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
        <div className="flex justify-center"><h2 className="text-white font-bold text-2xl">Write Articles here</h2></div>
        <div className="border-2 border-black bg-white m-5 w-[90vw]  md:w-[60vw] p-2 md:p-4" id='editorjs'></div>
    </div>);
}

export default RichTextEditor;