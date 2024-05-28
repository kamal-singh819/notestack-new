import axios from "axios";
const baseUrl = "http://localhost:5000/";
// const baseUrl = "https://notestack-07kq.onrender.com/";
// const baseUrl = "https://notestack-backend.vercel.app/";

async function commonAxios({ method, url, data, token, isFile = false }) {
    const response = await axios({
        method: method,
        url: `${baseUrl}${url}`,
        headers: token ? { 'Content-Type': isFile ? 'multipart/form-data' : 'application/json', Authorization: `Bearer ${token}` } : {},
        data: data
    });
    return response;
}
export default commonAxios;
export const baseCdnUrl = "http://localhost:5000/public/cdn/";
// export const baseCdnUrl = "https://notestack-07kq.onrender.com/public/cdn/";