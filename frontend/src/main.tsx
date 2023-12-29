import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext.tsx';
import './index.css';
import router from './routes/routes.tsx';
import { SearchContextProvider } from './contexts/SearchContext.tsx';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppContextProvider>
                <SearchContextProvider>
                    <RouterProvider router={router} />
                </SearchContextProvider>
            </AppContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
