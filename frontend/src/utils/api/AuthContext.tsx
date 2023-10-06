import React, {createContext, ReactNode, useContext, useState} from "react";

interface AuthState {
    role: string;
    adminId: string;
    auth: string;
}

const defaultAuthState: AuthState = { role: '', adminId: '', auth: '' };

interface AuthContextProps {
    authState: AuthState;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextProps>({
    authState: defaultAuthState,
    setAuthState: () => {}
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

