import React from "react";
import Router from "./components/Router/Router";
import { useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import CartProvider from "./CartContext";

function App() {
  const location = useLocation();
  const path = location.pathname;
  const notHome = path !== "/";

  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <CartProvider>
      <div className="min-h-screen">
        {
          notHome && (
            <NavBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
          ) /*Header*/
        }
        <div className="container mx-auto mt-10">
          <Router searchTerm={searchTerm} />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
