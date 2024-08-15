import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import HomePage from "../HomePage/HomePage";
import GameStore from "../GameStore/GameStore";
import GameOverview from "../GameOverview/GameOverview";
import Account from "../Account";
import PropTypes from "prop-types";
import Cart from "../Pages/Cart/Cart";
import Success from "../Pages/Success/Success";
import Cancel from "../Pages/Cancel/Cancel";

const Router = ({ searchTerm }) => {
  const [token, setToken] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/account/:id" element={<Account setToken={setToken} />} />
      <Route
        path="/account/login"
        element={<LoginForm setToken={setToken} />}
      />
      <Route
        path="/account/register"
        element={<RegisterForm setToken={setToken} />}
      />

      <Route path="/store" element={<GameStore searchTerm={searchTerm} />} />
      {/* Remember to pass searchTerm into gameStore */}
      <Route
        path="/store/:id"
        element={<GameOverview searchTerm={searchTerm} />}
      />
      <Route path="/account/library" element={<h1>Owned Games</h1>} />
      <Route path="/account/wishlist" element={<h1>Wishlist</h1>} />
      <Route path="/account/history" element={<h1>History</h1>} />

      <Route path="/account/cart" element={<Cart searchTerm={searchTerm} />} />
      {/* <Route path="/account/checkout" element={<Checkout />} /> */}
      {/* <Route path="/account/success" element={<Success />} /> */}
      {/* <Route path="/account/cancel" element={<Cancel />} /> */}
    </Routes>
  );
};
Router.propTypes = {
  searchTerm: PropTypes.string,
};
export default Router;
