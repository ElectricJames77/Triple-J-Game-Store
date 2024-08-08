import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import HomePage from "../HomePage/HomePage";
import GameStore from "../GameStore";
import GameOverview from "../GameOverview";
import PropTypes from 'prop-types'


const Router = ({ searchTerm }) => {
  const [token, setToken] = useState(null);

  return (
    <Routes>

      <Route path="/" element={<HomePage /> } />
      <Route path="/account" element={<h1>Account details</h1>} />
      <Route path="/account/login" element={<LoginForm setToken={setToken} />}/>
      <Route path="/account/register" element={<RegisterForm setToken={setToken} />}/>

      <Route path="/store" element={<GameStore searchTerm={searchTerm}/>} />{/* Remember to pass searchTerm into gameStore */}
      <Route path="/store/:gameid" element={<GameOverview searchTerm={searchTerm}/>} />
      <Route path="/account/library" element={<h1>Owned Games</h1>} />
      <Route path="/account/wishlist" element={<h1>Wishlist</h1>} />
      <Route path="/account/history" element={<h1>History</h1>} />

      <Route path="/account/cart" element={<h1>Account details</h1>} />
      <Route path="/store/checkout" element={<h1>Checkout</h1>} />
      
    </Routes>
  );
};
Router.propTypes = {
  searchTerm: PropTypes.string
}
export default Router;
