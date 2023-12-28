import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoutes from './PrivateRoutes';
import AddHotel from '../pages/AddHotel';
import MyHotels from '../pages/MyHotels';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'add-hotel',
                element: <PrivateRoutes />,
                children: [{ index: true, element: <AddHotel /> }],
            },
            {
                path: 'my-hotels',
                element: <PrivateRoutes />,
                children: [{ index: true, element: <MyHotels /> }],
            },
        ],
    },
]);

export default router;
