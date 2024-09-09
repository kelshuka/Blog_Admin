import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/logIn';
import Logout from './components/logOut';
import SignUp from './components/signUp';

function App() {
    const isAuthenticated = localStorage.getItem('adminToken');
    const isAdmin = localStorage.getItem('userType') === 'Admin';


    return (
        <Router>
            <Routes>
                <Route 
                    path="/login" 
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <AdminLogin />}  // No need for onLogin
                />
                <Route 
                    path="/dashboard" 
                    element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}// isAdmin was not included to make the first admin
                />
                <Route 
                    path="/logout" 
                    element={isAuthenticated ? <Logout /> : <Navigate to="/login" />}
                />
                <Route 
                    path="/sign-up" 
                    element={<SignUp />} 
                />
                <Route 
                    path="/" 
                    element={<Navigate to="/login" />} 
                />
            </Routes>
        </Router>
    );
}

export default App;