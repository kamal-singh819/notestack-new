import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import { LoginRegisterAlert } from '../helper/SweetAlert';
const options = ['DBMS', 'OS', 'OOPs', 'Mathematics'];
const Admin = () => {
  const [subject, setSubject] = useState(null);
  const [pdfs, setPdfs] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(subject);
    console.log(pdfs);
    if (!subject || pdfs?.length === 0)
      LoginRegisterAlert('All fields Mandatory', 'warning');
    else {
      const formData = new FormData();
      formData.append('subject', subject);
      [...pdfs].forEach(file => formData.append('files', file));
      try {
        const response = await axios({
          method: 'post',
          url: `http://localhost:5000/admin/upload-notes`,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        });
        console.log(response);
        // if (response.data.message === "UPLOADED") {
        //   LoginRegisterAlert("Image Uploaded Successfully!", "success");
        // } else LoginRegisterAlert("Something went wrong!", "warning");
      } catch (error) {
        console.log(error);
      }
    }
    setPdfs(null);
    setSubject(null);
  }
  function handlePdfs(e) {
    setPdfs(e.target.files);
  }
  function handleDropdown(e) {
    setSubject(e.value);
  }
  return (
    <div>
      <h2>This is Admin Page</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[10rem]">
        <Dropdown
          options={options}
          onChange={handleDropdown}
          value="Select"
          placeholder="Select"
        />
        <label
          className="border rounded-md px-3 py-1"
          onChange={handlePdfs}
          htmlFor="uploadPdfs"
        >
          {pdfs ? 'Selected' : 'Select pdfs'}
          <input
            id="uploadPdfs"
            type="file"
            className="hidden"
            multiple="multiple"
          />
        </label>
        <button className="border rounded-md px-3 py-1">Upload</button>
      </form>
    </div>
  );
};
export default Admin;
