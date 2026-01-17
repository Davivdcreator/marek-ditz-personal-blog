import React, { useState } from 'react';


import { AuthContext } from './AuthContextDefinition';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('github_pat'));
    const [repoOwner, setRepoOwner] = useState<string | null>(() => localStorage.getItem('github_owner'));
    const [repoName, setRepoName] = useState<string | null>(() => localStorage.getItem('github_repo'));

    // The useEffect block is no longer needed as the initial state is now set directly from localStorage
    // using the useState callback initializer.
    // useEffect(() => {
    //     const storedToken = localStorage.getItem('github_pat');
    //     const storedOwner = localStorage.getItem('github_owner');
    //     const storedRepo = localStorage.getItem('github_repo');
    //     if (storedToken && storedOwner && storedRepo) {
    //         setToken(storedToken);
    //         setRepoOwner(storedOwner);
    //         setRepoName(storedRepo);
    //     }
    // }, []);

    const login = (newToken: string, newOwner: string, newRepo: string) => {
        localStorage.setItem('github_pat', newToken);
        localStorage.setItem('github_owner', newOwner);
        localStorage.setItem('github_repo', newRepo);
        setToken(newToken);
        setRepoOwner(newOwner);
        setRepoName(newRepo);
    };

    const logout = () => {
        localStorage.removeItem('github_pat');
        localStorage.removeItem('github_owner');
        localStorage.removeItem('github_repo');
        setToken(null);
        setRepoOwner(null);
        setRepoName(null);
    };

    return (
        <AuthContext.Provider value={{
            token,
            repoOwner,
            repoName,
            isAuthenticated: !!token,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}
