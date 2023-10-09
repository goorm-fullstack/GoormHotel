import React, {createContext, ReactNode, useContext, useState} from "react";

interface AuthState {
    role: string;
    adminId: string;
    auth: string;
}

interface MemberAuthState {
    role: string;
    memberId: string;
}

const defaultAuthState: AuthState = { role: '', adminId: '', auth: '' };
const defaultMemberAuthState: MemberAuthState = { memberId: '', role: '' };

interface AuthContextProps {
    authState: AuthState;
    memberAuthState: MemberAuthState;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
    setMemberAuthState: React.Dispatch<React.SetStateAction<MemberAuthState>>;
}

export const AuthContext = createContext<AuthContextProps>({
    authState: defaultAuthState,
    memberAuthState: defaultMemberAuthState,
    setAuthState: () => {},
    setMemberAuthState: () => {}
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
    const [memberAuthState, setMemberAuthState] = useState<MemberAuthState>(defaultMemberAuthState);

    return (
        <AuthContext.Provider value={{ authState, memberAuthState, setAuthState, setMemberAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

