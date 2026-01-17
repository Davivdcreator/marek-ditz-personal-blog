import { createContext } from 'react';

export interface AuthContextType {
    token: string | null;
    repoOwner: string | null;
    repoName: string | null;
    isAuthenticated: boolean;
    login: (token: string, owner: string, repo: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
