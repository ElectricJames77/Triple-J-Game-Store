import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from './AuthHooks/Logout';


const Account = () => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const API_URL =
    "https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/users"; //Games URL

    useEffect(() => {
        const fetchAccount = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch account details');
                }
                const accountData = await response.json();
                setAccount(accountData);
                setLoading(false);
                console.log(accountData);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchAccount();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }
    if (!account) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>You are not logged in. Please log in or create an account.</p>
            </div>
        );
    }

    return (
        <div className="account-container">
            <h2 className="account-header">Account Details</h2>
            <div className="account-details">
                <div className="profile-section">
                    <h3 className="profile-header">Profile</h3>
                    <p className="profile-info"> Username: {account?.username}</p>
                    <p className="profile-info">Email: {account?.email}</p>
                </div>
                <div className="cart-section">
                    <h3 className="cart-header">Cart</h3>
                    {account?.cart?.games?.length > 0 ? (
                        <ul className="cart-list">
                            {account?.cart?.games?.map((game) => {
                                return (
                                    <li key={game.id} className="cart-item">
                                        <h4 className="cart-item-title">{game.gameId}</h4>
                                        <p className="cart-item-price">{game.price}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="cart-empty">Your cart is empty.</p>
                    )}
                </div>
            </div>
                <div className="account-actions">
                    <Logout />
                    <Link to={`/store`}>
                    <button className="store-button">Go To Store</button>
                    </Link>
                </div>
        </div>
    );
};

export default Account;