import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoutes from './PrivateRoutes';
import AddHotel from '../pages/AddHotel';
import MyHotels from '../pages/MyHotels';
import EditHotel from '../pages/EditHotel';
import Search from '../pages/Search';
import HotelDetails from '../pages/HotelDetails';

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
                path: 'search',
                element: <Search />,
            },
            {
                path: 'hotel/:hotelId',
                element: <HotelDetails />,
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
            {
                path: 'edit-hotel',
                element: <PrivateRoutes />,
                children: [{ path: ':hotelId', element: <EditHotel /> }],
            },
        ],
    },
]);

export default router;
