import axios from "axios";

const Instance = axios.create({
  baseURL : process.env.REACT_APP_API_URL,
  headers : {
    'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL, // 서버 domain
  }
});

export default Instance;