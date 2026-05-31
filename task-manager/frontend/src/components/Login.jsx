import React, { useState } from 'react';
import { authService } from '../services/api';
import { toast } from 'react-hot-toast';

const Login = ({ onLogin, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authService.login({ email, password });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data));
                toast.success('Welcome back!');
                onLogin(response.data.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f5f7fa] to-[#e9edf2]">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden fade-in">
                <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-chart-line text-white text-3xl"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Task Manager Pro</h1>
                    <p className="text-white/80 text-sm mt-1">Login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">
                            <i className="fas fa-envelope text-primary mr-1"></i> Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">
                            <i className="fas fa-lock text-primary mr-1"></i> Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? <><i className="fas fa-spinner fa-pulse mr-2"></i>Logging in...</> : <><i className="fas fa-sign-in-alt mr-2"></i>Login</>}
                    </button>
                </form>

                <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
                    <p className="text-text-secondary">
                        Don't have an account?{' '}
                        <button onClick={onSwitchToRegister} className="text-primary font-semibold hover:underline">
                            Register <i className="fas fa-arrow-right ml-1"></i>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;