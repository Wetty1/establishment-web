/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import { useAuth } from './auth';

export interface IEstablishment {
    userid: string;
    user?: {
        id: string;
        name: string;
    }
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

export interface IFilters {
    city: string[];
    neighborhood: string[];
    type: string[];
}

interface EstablishmentContextData {
    filters: IFilters;
    getAllEstablishment(queryParams: string): Promise<IEstablishment[]>;
    createEstablishment(newEstablishment: ICreateNewEstablishment): Promise<IEstablishment>;
    deleteEstablishment(id: string): Promise<IEstablishment>;
    getAllFilters(): Promise<IFilters>;
}

const EstablishmentContext = createContext<EstablishmentContextData>({} as EstablishmentContextData);

const EstablishmentProvider: React.FC = ({ children }) => {
    const { token } = useAuth();

    const [filters, setFilters] = useState<IFilters>({
        city: [],
        neighborhood: [],
        type: [],
    })

    const getAllEstablishment = useCallback(async (queryParams:string) => {
        const { data } = await api.get<IEstablishment[]>(`/establishments${queryParams}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(data, queryParams)

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

    const getAllFilters = useCallback(async () => {
        const { data } = await api.get<IFilters>('/establishments/filters', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setFilters(data);
        console.log(data);

        return data;
    }, [token]);

    return (
        <EstablishmentContext.Provider
            value={{
               filters,
               createEstablishment,
               deleteEstablishment,
               getAllEstablishment,
               getAllFilters,
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