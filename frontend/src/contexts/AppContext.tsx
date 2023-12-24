import { ReactNode, createContext } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import * as APIClient from '../api-client';

type ToastMessage = {
    message: string;
    type: 'SUCCESS' | 'ERROR' | 'WARNING';
};

type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProviderType = {
    children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderType) => {
    const { isError } = useQuery('validateToken', APIClient.validateToken, {
        retry: false,
    });

    const showToast = (toastMessage: ToastMessage) => {
        if (toastMessage.type === 'SUCCESS') {
            toast.success(toastMessage.message);
        } else if (toastMessage.type === 'ERROR') {
            toast.error(toastMessage.message);
        }
    };

    return (
        <AppContext.Provider value={{ showToast, isLoggedIn: !isError }}>
            {children}
        </AppContext.Provider>
    );
};
