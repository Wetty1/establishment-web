/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

export interface SignInCredentials {
    login: string;
    password: string;
}

export interface SignUpCredentials {
    name: string;
    login: string;
    password: string;
    level: boolean;
}

interface AuthState {
    token: string;
    user: UserProps;
}

interface UserProps {
    name: string;
    level: number;
}

interface AuthContextData {
    token: string;
    user: UserProps;
    signIn(credentialsSignIn: SignInCredentials): Promise<UserProps>;
    signUp(credentialsSignUp: SignUpCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@establishment:token');
        const user = localStorage.getItem('@establishment:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ login, password }: SignInCredentials) => {
        const response = await api.post('/login', {
            login,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem('@establishment:token', token);
        localStorage.setItem('@establishment:user', JSON.stringify(user));

        setData({ token, user });

        return response.data.user;
    }, []);

    const signUp = useCallback(async ({login, password, level, name}: SignUpCredentials) => {
        const levelN = level ? 1 : 0;
        

        const newUser = await api.post('/register', {
            login,
            password,
            name,
            level: levelN,
        });

        console.log(newUser);
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@establishment:token');
        localStorage.removeItem('@establishment:user');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                token: data.token,
                user: data.user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
