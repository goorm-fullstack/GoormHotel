import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const checkAuth = () => {
    const userCookie = cookies.get("user");

    if (!userCookie) {
        return { isAuthenticated: false };
    }

    return {
        isAuthenticated: true,
        role: userCookie.role,
        auth: userCookie.auth
    };
};

// export default CookieCheck;
