'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, userAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    username: string;
    email: string;
    displayName: string;
    bio: string;
    location: string;
    website: string;
    avatar: string;
    createdAt: string;
    skillsHave: string[];
    skillsWant: string[];
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await userAPI.getMyProfile();
                setUser({
                    id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    displayName: response.data.displayName || '',
                    bio: response.data.bio || '',
                    location: response.data.location || '',
                    website: response.data.website || '',
                    avatar: response.data.avatar || '',
                    createdAt: response.data.createdAt || '',
                    skillsHave: response.data.skillsHave || [],
                    skillsWant: response.data.skillsWant || [],
                });
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };

    const login = async (username: string, password: string) => {
        const response = await authAPI.login({ username, password });
        localStorage.setItem('token', response.data.token);
        setUser({
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            displayName: '',
            bio: '',
            location: '',
            website: '',
            avatar: '',
            createdAt: '',
            skillsHave: [],
            skillsWant: [],
        });
        router.push('/dashboard');
    };

    const register = async (username: string, email: string, password: string) => {
        const response = await authAPI.register({ username, email, password });
        localStorage.setItem('token', response.data.token);
        setUser({
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            displayName: '',
            bio: '',
            location: '',
            website: '',
            avatar: '',
            createdAt: '',
            skillsHave: [],
            skillsWant: [],
        });
        router.push('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    const refreshUser = async () => {
        await checkAuth();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
