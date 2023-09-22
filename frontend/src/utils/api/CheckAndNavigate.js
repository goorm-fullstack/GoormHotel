import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from './CookieCheck';

const CheckAndNavigate = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const { isAuthenticated, role } = checkAuth();

        if (!isAuthenticated || (role !== 'admin' && role !== 'manager')) {
            navigate("/admin/login");
        }
    }, []);

    return null;
};

export default CheckAndNavigate;