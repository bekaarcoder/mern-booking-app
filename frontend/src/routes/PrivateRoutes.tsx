import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const PrivateRoutes = () => {
    const { loading, isLoggedIn } = useAppContext();
    return (
        <>
            {!loading && (
                <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>
            )}
        </>
    );
};

export default PrivateRoutes;
