/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import { useAuth } from './auth';

export interface IEstablishment {
    userid: string;
    address: string;
    neighborhood: string;
    city: string;
    type: string;
    coordinates: string;
}

export interface ICreateNewEstablishment {
    address: string;
    neighborhood: string;
    city: string;
    type: string;
}

interface EstablishmentContextData {
    getAllEstablishment(): Promise<IEstablishment[]>;
    createEstablishment(newEstablishment: ICreateNewEstablishment): Promise<IEstablishment>;
    deleteEstablishment(id: string): Promise<IEstablishment>;
}

const EstablishmentContext = createContext<EstablishmentContextData>({} as EstablishmentContextData);

const EstablishmentProvider: React.FC = ({ children }) => {
    const { token } = useAuth();

    const getAllEstablishment = useCallback(async () => {
        const { data } = await api.get<IEstablishment[]>('/establishments', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(data);

        return data;
    }, [token]);

    const createEstablishment = useCallback(async (newEstablishment: ICreateNewEstablishment) => {
        const { data } = await api.post<IEstablishment>('/establishments', newEstablishment, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    }, [token]);

    const deleteEstablishment = useCallback(async (id: string) => {
        const { data } = await api.delete<IEstablishment>(`/establishments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    }, [token]);

    return (
        <EstablishmentContext.Provider
            value={{
               createEstablishment,
               deleteEstablishment,
               getAllEstablishment,
            }}
        >
            {children}
        </EstablishmentContext.Provider>
    );
};

function useEstablishment(): EstablishmentContextData {
    const context = useContext(EstablishmentContext);

    if (!context) {
        throw new Error('useEstablishment must be used within an EstablishmentProvider');
    }

    return context;
}

export { EstablishmentProvider, useEstablishment };