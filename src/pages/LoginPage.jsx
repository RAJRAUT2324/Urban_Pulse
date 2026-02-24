import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Local People');
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (isRegister) {
                const { data } = await axios.post(
                    'http://localhost:5000/api/users',
                    { name, email, password, role },
                    config
                );
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/profile');
            } else {
                const { data } = await axios.post(
                    'http://localhost:5000/api/users/login',
                    { email, password, role },
                    config
                );
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/profile');
            }
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-pmc-blue">
                        {isRegister ? 'Create your account' : 'Sign in to your account'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {isRegister ? 'Join the Urban Pulse community' : 'Access your smart governance portal'}
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                    {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}
                    <div className="rounded-md shadow-sm -space-y-px">
                        {isRegister && (
                            <div>
                                <input
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pmc-blue focus:border-pmc-blue focus:z-10 sm:text-sm"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div>
                            <input
                                type="email"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 ${!isRegister ? 'rounded-t-md' : ''} focus:outline-none focus:ring-pmc-blue focus:border-pmc-blue focus:z-10 sm:text-sm`}
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pmc-blue focus:border-pmc-blue focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <select
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pmc-blue focus:border-pmc-blue focus:z-10 sm:text-sm"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="Local People">Local People</option>
                                <option value="Worker">Worker</option>
                                <option value="Department">Department</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-pmc-blue hover:bg-pmc-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pmc-blue transition-all"
                        >
                            {isRegister ? 'Register' : 'Sign in'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-sm text-pmc-blue hover:underline"
                    >
                        {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
