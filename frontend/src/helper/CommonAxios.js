import axios from "axios";
const baseUrl = "http://localhost:5000/";

async function commonAxios({ method, url, data, token }) {
    const response = await axios({
        method: method,
        url: `${baseUrl}${url}`,
        headers: token ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : {},
        data: data
    });
    return response;
}

export default commonAxios;