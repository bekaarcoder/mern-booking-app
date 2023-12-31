import { useMutation, useQueryClient } from 'react-query';
import * as APIClient from '../api-client';
import { useAppContext } from '../hooks/useAppContext';

const SignOutButton = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const mutation = useMutation(APIClient.logout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken');
            showToast({ message: 'Logout Successful', type: 'SUCCESS' });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };
    return (
        <button
            onClick={handleClick}
            className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
