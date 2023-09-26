import axios from "axios";

const Instance = axios.create({
  baseURL : process.env.REACT_APP_API_URL,
  headers : {
    'Access-Control-Allow-Origin': '*', // 서버 domain
    'Access-Control-Allow-Credentials':"true",
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
  }
});

// Instance.interceptors.request.use(
//     (config) => {
//         console.log("Axios 세션 관리가 호출됨:", sessionId);
//       const sessionId = localStorage.getItem('sessionId');
//       if (sessionId) {
//         config.headers['sessionId'] = sessionId;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// );

export default Instance;