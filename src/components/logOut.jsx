
import React from 'react';
import { useNavigate } from 'react-router-dom';



function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');  // Clear token from localStorage
        navigate('/login'); // Redirect to login page after logout
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
