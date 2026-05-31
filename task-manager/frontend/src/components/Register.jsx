import React, { useState } from 'react';
import { authService } from '../services/api';
import { toast } from 'react-hot-toast';

const Register = ({ onClose, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        setLoading(true);

        try {
            const response = await authService.register({ name, email, password });
            if (response.data.success) {
                toast.success('Registration successful! Please login.');
                onClose();
                onSwitchToLogin();
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-user-plus text-white text-3xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Create Account</h2>
                    <p className="text-white/80 text-sm mt-1">Join Task Manager Pro</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">
                            <i className="fas fa-user text-primary mr-1"></i> Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                            required
                            placeholder="Enter your name"
                        />
                    </div>

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
                            placeholder="Min 6 characters"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? <><i className="fas fa-spinner fa-pulse mr-2"></i>Creating...</> : <><i className="fas fa-user-plus mr-2"></i>Register</>}
                    </button>

                    <button type="button" onClick={onClose} className="w-full text-text-secondary hover:text-primary transition mt-2">
                        <i className="fas fa-arrow-left mr-1"></i> Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;