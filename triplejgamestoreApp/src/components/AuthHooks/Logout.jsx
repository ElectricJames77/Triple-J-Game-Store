import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/account/login');
    };
    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;