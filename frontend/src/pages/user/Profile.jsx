import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { LoginRegisterAlert } from "../../helper/SweetAlert";
import { useState } from "react";

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [image, setImage] = useState(null);
  async function handleUploadProfile(e) {
    e.preventDefault();
    if (!image) {
      LoginRegisterAlert("Choose an Image", "warning");
    } else {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await axios({
          method: "put",
          url: `http://localhost:5000/users/upload-profile/?emailId=${userInfo.email}`,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
          data: formData,
        });
        if (response.data.message === "UPLOADED") {
          LoginRegisterAlert("Image Uploaded Successfully!", "success");
        } else LoginRegisterAlert("Something went wrong!", "warning");
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleUploadChange(e) {
    setImage(e.target.files[0]);
  }

  return (
    <div>
      <p>Name is : {userInfo.name}</p>
      <p>Email is : {userInfo.email}</p>
      <div className="w-[6rem] h-6rem]">
        {<CgProfile className="w-full h-full rounded-full" />}
      </div>
      <form onSubmit={handleUploadProfile}>
        <div className="flex gap-4">
          <label
            htmlFor="uploadProfile"
            className="bg-white border-2 rounded-md border-accentOrange cursor-pointer px-5 py-1"
          >
            {image ? image.name : "Choose Image"}
            <input
              id="uploadProfile"
              className="hidden"
              type="file"
              accept=".jpg, .png, .jpeg, webp"
              onChange={handleUploadChange}
            />
          </label>
          <button className="cursor-pointer bg-accentGreen px-5 py-1 rounded-md text-white">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
