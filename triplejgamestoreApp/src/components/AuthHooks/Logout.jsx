import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import './Logout.css'

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/account/login');
    };
    return (
        <button onClick={handleLogout} className="logout-button">Logout</button>
    );
};

export default Logout;