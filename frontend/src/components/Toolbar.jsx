import React from 'react';

const Toolbar = ({ addContentBlock }) => {
    return (
        <div className='flex gap-2 text-white'>
            <button className='border px-3 py-1 rounded-md text-2xl' onClick={() => addContentBlock('h1')}>H1</button>
            <button className='border px-3 py-1 rounded-md text-xl' onClick={() => addContentBlock('h2')}>H2</button>
            <button className='border px-3 py-1 rounded-md text-lg' onClick={() => addContentBlock('h3')}>H3</button>
            <button className='border px-3 py-1 rounded-md text-base' onClick={() => addContentBlock('p')}>Paragraph</button>
            <button className='border px-3 py-1 rounded-md text-base' onClick={() => addContentBlock('code')}>Code Block</button>
        </div>
    );
};

export default Toolbar;
