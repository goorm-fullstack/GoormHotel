import axios from "axios";

const Instance = axios.create({
  baseURL : process.env.REACT_APP_API_URL,
});

export default Instance;