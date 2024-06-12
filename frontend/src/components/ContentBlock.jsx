import { useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ContentBlock = ({ type, text, id, updateContentBlock }) => {
    const [isEditing, setIsEditing] = useState(true);
    const [content, setContent] = useState(text);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        updateContentBlock(id, content);
    };

    const renderContent = () => {
        switch (type) {
            case 'h1':
                return <h1 className='text-2xl text-white' onDoubleClick={handleDoubleClick}>{content}</h1>;
            case 'h2':
                return <h2 className='text-xl text-white' onDoubleClick={handleDoubleClick}>{content}</h2>;
            case 'h3':
                return <h3 className='text-lg text-white' onDoubleClick={handleDoubleClick}>{content}</h3>;
            case 'p':
                return <p className='text-base text-white' onDoubleClick={handleDoubleClick}>{content}</p>;
            case 'code':
                return <pre className='text-base p-3 bg-black' onDoubleClick={handleDoubleClick}>
                    <SyntaxHighlighter children={content} language={"javascript"} style={dracula} />
                </pre>;
            default:
                return null;
        }
    };

    return isEditing ? (
        <textarea
            className='w-full p-4 my-3'
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={6}
            autoFocus
        />
    ) : (
        renderContent()
    );
};

export default ContentBlock;
