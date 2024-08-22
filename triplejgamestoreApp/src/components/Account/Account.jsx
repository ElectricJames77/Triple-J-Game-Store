import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "../AuthHooks/Logout";
import { fetchCartGames } from "../../LinkURL";
import "./Account.css";

const Account = () => {
  const [account, setAccount] = useState([]);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartGames, setCartGames] = useState([]);
  const { id } = useParams();
  const API_URL =
    "https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/users"; //Games URL

  useEffect(() => {
    const fetchAccount = async () => {
      const token = localStorage.getItem("token");
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
          throw new Error("Failed to fetch account details");
        }
        const accountData = await response.json();
        setAccount(accountData);
        setLoading(false);
        // console.log(accountData);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      if (account?.role !== "ADMIN") {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await response.json();
        setUsers(usersData);
        setLoading(false);
        console.log(usersData);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [account]);

  useEffect(() => {
    async function fetchGames() {
      const token = localStorage.getItem("token");
      if (!account.cart) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchCartGames(id, token);
        setCartGames(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cart games", err);
        setError(err);
        setLoading(false);
      }
    }

    fetchGames();
  }, [account, id]);

  if (loading) {
    return (
      <div className="loadingScreen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="loadingScreen">
        Error: {error.message}
      </div>
    );
  }
  if (!account) {
    return (
      <div className="loadingScreen">
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
              {cartGames?.map((game) => {
                return (
                  <li key={game.id} className="cart-item">
                    <h4 className="cart-item-title">{game.title}</h4>
                    <p className="cart-item-price">{game.price}</p>
                    <img
                      className="gameImage-cart"
                      src={game.imageUrl}
                      alt={game.title}
                      style={{ width: "125px" }}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="cart-empty">Your cart is empty.</p>
          )}
        </div>
        <div className="cart-section">
          <h3 className="cart-header">Users</h3>
          {users?.length > 0 ? (
            <ul className="cart-list">
              {users?.map((user) => {
                return (
                  <li key={user.id} className="cart-item">
                    <h4 className="cart-item-title">{user.username}</h4>
                    <p className="cart-item-price">{user.email}</p>
                    <p className="cart-item-price">{user.role}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="users-empty">You Are Not An Admin</p>
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
