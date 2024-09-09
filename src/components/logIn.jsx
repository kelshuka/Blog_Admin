
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';


// My Back-end API URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Use useNavigate to programmatically navigate

    const handleLogin = (e) => {
        e.preventDefault();
        axiosInstance.post('/log-in', { username, password })
            .then(response => {
                const { token, type } = response.data;
                localStorage.setItem('adminToken', token);  // Store token in localStorage
                localStorage.setItem('userType', type);  // Store user type
                
                alert('Login successful');
                navigate('/dashboard');  // Redirect to admin dashboard
            })
            .catch(error => {
                console.error('Login error:', error);
                setError('Invalid username or password');
            });
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Admin Login</h2>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default AdminLogin;