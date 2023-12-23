import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as APIClient from '../api-client';

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const mutation = useMutation(APIClient.register, {
        onSuccess: () => {
            console.log('Registration Successful');
        },
        onError: (error: Error) => {
            console.log(error);
        },
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        type="text"
                        className={`border ${
                            errors.firstName && 'border-red-500'
                        } rounded w-full py-1 px-2 font-normal my-1`}
                        {...register('firstName', {
                            required: 'First Name is required',
                        })}
                    />
                    {errors.firstName && (
                        <span className="text-red-500 text-sm font-normal">
                            {errors.firstName.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        type="text"
                        className={`border ${
                            errors.lastName && 'border-red-500'
                        } rounded w-full py-1 px-2 font-normal my-1`}
                        {...register('lastName', {
                            required: 'Last Name is required',
                        })}
                    />
                    {errors.lastName && (
                        <span className="text-red-500 text-sm font-normal">
                            {errors.lastName.message}
                        </span>
                    )}
                </label>
            </div>
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
            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input
                    type="password"
                    className={`border ${
                        errors.confirmPassword && 'border-red-500'
                    } rounded w-full py-1 px-2 font-normal my-1`}
                    {...register('confirmPassword', {
                        validate: (val) => {
                            if (!val) {
                                return 'Confirm Password is required';
                            } else if (watch('password') !== val) {
                                return 'Password does not match';
                            }
                        },
                    })}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500 text-sm font-normal">
                        {errors.confirmPassword.message}
                    </span>
                )}
            </label>
            <span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl"
                >
                    Create Account
                </button>
            </span>
        </form>
    );
};

export default Register;
