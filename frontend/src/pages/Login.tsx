import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as APIClient from '../api-client';
import { useAppContext } from '../hooks/useAppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export type LoginFormData = {
    email: string;
    password: string;
};

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const mutation = useMutation(APIClient.login, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken');
            showToast({ message: 'Logged in successfully', type: 'SUCCESS' });
            navigate(location.state?.from?.pathname || '/');
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email"
                    className={`border ${
                        errors.email && 'border-red-500'
                    } rounded w-full py-1 px-2 font-normal my-1`}
                    {...register('email', {
                        required: 'Email is required',
                    })}
                />
                {errors.email && (
                    <span className="text-red-500 text-sm font-normal">
                        {errors.email.message}
                    </span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password"
                    className={`border ${
                        errors.password && 'border-red-500'
                    } rounded w-full py-1 px-2 font-normal my-1`}
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                        },
                    })}
                />
                {errors.password && (
                    <span className="text-red-500 text-sm font-normal">
                        {errors.password.message}
                    </span>
                )}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="underline">
                        Register here
                    </Link>
                </span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl"
                >
                    Login
                </button>
            </span>
        </form>
    );
};

export default Login;
