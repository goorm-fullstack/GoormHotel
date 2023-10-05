import {createContext, useContext, useState} from "react";

const defaultAuthState = { role: '', adminId: '', auth: '' };

export const AuthContext = createContext({
    authState: defaultAuthState,
    setAuthState: () => {}
});

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(defaultAuthState);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

