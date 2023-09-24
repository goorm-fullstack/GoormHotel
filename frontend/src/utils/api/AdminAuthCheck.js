import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Instance from "./axiosInstance";

export const AdminAuthCheck = ({ requiredAuthorities, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionInfo = async () => {
      try {
        const response = await Instance.get('/api/session');
        const { role, authorities } = response.data;
        console.log('세션 가져오기', response.data, response)

        // 역할이 'ADMIN'이거나 'MANAGER'인지 확인
        if (role !== 'ADMIN' && role !== 'MANAGER') {
          navigate('/admin/login');
          console.log('어드민 매니저가 아님')
          return;
        }

        // 필요한 권한이 있는지 확인
        if (requiredAuthorities && !authorities.some(auth => requiredAuthorities.includes(auth))) {
          navigate('/admin/unauthorized');
        }

      } catch (error) {
        console.error("Failed to fetch session info:", error);
        // navigate('/admin/login');
      }
    };

    fetchSessionInfo();
  }, [requiredAuthorities, navigate]);

  return children;
};