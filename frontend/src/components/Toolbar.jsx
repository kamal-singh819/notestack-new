import { FaCode } from "react-icons/fa";

const Toolbar = ({ addContentBlock }) => {
    return (
        <div className='flex gap-2 text-white flex-col w-12'>
            <button className='border px-3 py-1 rounded-md text-2xl' onClick={() => addContentBlock('h1')}>h1</button>
            <button className='border px-3 py-1 rounded-md text-xl' onClick={() => addContentBlock('h2')}>h2</button>
            <button className='border px-3 py-1 rounded-md text-lg' onClick={() => addContentBlock('h3')}>h3</button>
            <button className='border px-3 py-1 rounded-md text-base' onClick={() => addContentBlock('p')}>p</button>
            <button className='border px-3 py-1 rounded-md text-lg' onClick={() => addContentBlock('code')}><FaCode /></button>
        </div>
    );
};

export default Toolbar;
