import React from 'react';
import { AuthProvider } from './auth';
import { EstablishmentProvider } from './establishment';

export const AppProvider: React.FC = ({ children }) => (
    <AuthProvider>
        <EstablishmentProvider>
            {children}
        </EstablishmentProvider>
    </AuthProvider>
);