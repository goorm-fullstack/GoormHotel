import {useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect, useState} from "react";
import Instance from "./axiosInstance";

// SessionContext 생성
export const SessionContext = createContext(null);

// SessionContext.Provider를 포함하는 컴포넌트
export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await Instance.get('/api/session');
        setSessionData(response.data);
      } catch (error) {
        console.error('Failed to fetch session:', error);
      }
    };

    fetchSession();
  }, []);

  return (
      <SessionContext.Provider value={{ sessionData, setSessionData }}>
        {children}
      </SessionContext.Provider>
  );
};

// AdminAuthCheck 컴포넌트
export const AdminAuthCheck = ({ requiredAuthorities, children }) => {
  const navigate = useNavigate();
  const { sessionData } = useContext(SessionContext);
  useEffect(() => {
    if (sessionData) {
      const { role, authorities } = sessionData;

      // Check role
      if (role !== 'ADMIN' && role !== 'MANAGER') {
        navigate('/admin/login');
        return;
      }

      // Check authorities
      if (requiredAuthorities && !authorities.some(authorities => requiredAuthorities.includes(authorities))) {
        navigate('/admin');
      }
    }
  }, [requiredAuthorities, sessionData, navigate]);

  return children;
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('유저세션은 프로바이더를 통하여 사용되어야 합니다');
  }
  return context;
};