import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

const Router = () => {
  const [token, setToken] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />

      <Route path="/account/login" element={<LoginForm setToken={setToken} />}/>
      <Route path="/account/register" element={<RegisterForm setToken={setToken} />}/>

      <Route path="/store" element={<h1>Main store</h1>} />
      <Route path="/store/:gameid" element={<h1>Game details</h1>} />
      <Route path="/account/library" element={<h1>Owned Games</h1>} />
      <Route path="/account/wishlist" element={<h1>Wishlist</h1>} />
      <Route path="/account/history" element={<h1>History</h1>} />

      <Route path="/account/cart" element={<h1>Account details</h1>} />
      <Route path="/store/checkout" element={<h1>Checkout</h1>} />
      
    </Routes>
  );
};

export default Router;
