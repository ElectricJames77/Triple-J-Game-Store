import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import HomePage from "../HomePage/HomePage";

const Router = () => {
  const [token, setToken] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<HomePage /> } />
      <Route path="/account" element={<h1>Account details</h1>} />
      <Route path="/account/login" element={<LoginForm setToken={setToken} />}/>
      <Route path="/account/register" element={<RegisterForm setToken={setToken} />}/>
      <Route path="/store" element={<h1>Main store</h1>} />
      <Route path="/store/checkout" element={<h1>Checkout</h1>} />
      <Route path="/store/:gameid" element={<h1>Game details</h1>} />
    </Routes>
  );
};

export default Router;
