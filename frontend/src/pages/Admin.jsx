import { useState } from 'react';
import Select from 'react-select';
import 'react-dropdown/style.css';
import axios from 'axios';
import { LoginRegisterAlert } from '../helper/SweetAlert';
import { subjectOptions } from '../helper/data';
const token = JSON.parse(localStorage.getItem('userInfo'))?.accessToken;

const Admin = () => {
  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [descrip, setDescrip] = useState('');
  async function handleSubmit(e) {
    e.preventDefault();
    if (!subject || !topic || !pdfUrl || !descrip)
      LoginRegisterAlert('All fields Mandatory', 'warning');
    else {
      try {
        const response = await axios({
          method: 'post',
          url: `http://localhost:5000/admin/upload-notes`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: { subject, pdfName: topic, pdfUrl, description: descrip },
        });
        if (response.data.message === 'UPLOADED') {
          LoginRegisterAlert('Image Uploaded Successfully!', 'success');
        } else LoginRegisterAlert('Something went wrong!', 'warning');
      } catch (error) {
        console.log(error);
      }
    }
    setSubject(null);
    setTopic('');
    setPdfUrl('');
    setDescrip('');
  }

  return (
    <div className='flex justify-center min-h-[calc(100vh-4rem)] bg-darkColor'>
      <div className="flex flex-col items-center gap-5 mt-10 w-full">
        <h2 className="text-xl font-bold text-white">Upload Notes</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-[96%] md:w-[80%] xl:w-[60%]"
        >
          <Select onChange={e => setSubject(e.value)} options={subjectOptions} placeholder="Select Subject" />
          <input
            onChange={e => setTopic(e.target.value)}
            value={topic}
            className=" focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
            type="text"
            placeholder="Topic Name/ Subject Name"
          />
          <input
            onChange={e => setPdfUrl(e.target.value)}
            value={pdfUrl}
            className=" focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
            type="text"
            placeholder="pdf link (drive link)"
          />
          <textarea
            onChange={e => setDescrip(e.target.value)}
            value={descrip}
            className="focus:outline-none border-2 border-gray-600 py-2 px-3 rounded-md"
            rows="4"
            placeholder="Description min 400 characters"
          ></textarea>
          <button className="border border-gray-600 bg-red-600 text-white py-2 px-3 rounded-md">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};
export default Admin;
