import React, { useState } from 'react';
import axiosInstance from '../api';  // Import the Axios instance that has the base URL

function AdminManagement() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance.post('/make-admin', { username })
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('Error making user an admin:', error);
                setMessage('Error: Unable to make user an admin.');
            });
    };

    return (
        <div>
            <h2>Admin Management</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Make Admin</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AdminManagement;
