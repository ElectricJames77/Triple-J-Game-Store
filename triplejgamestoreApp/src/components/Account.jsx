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
        <div>
            <h2>Account Details</h2>
            <p>Username: {account?.username}</p>
            <p>Email: {account?.email}</p>
            {account?.cart?.length > 0 ? (
                account?.cart?.map((game) => {
                    return (
                        <div key={game.id}>
                            <h2>{game.title}</h2>
                            <p>{game.price}</p>
                        </div>
                    );
                })
            ) : (
                <p>Your cart is empty.</p>
            )}
            <Logout />
            <Link to={`/store`}>
            <button>Go To Store</button>
            </Link>
        </div>
    );
};

export default Account;