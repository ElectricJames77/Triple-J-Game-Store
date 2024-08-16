import "./Cart.css";
import { CartContext } from "../../../CartContext";
import { useContext, useEffect, useState } from "react";
import {
  fetchCartGames,
  addGameToCart,
  removeGameFromCart,
} from "../../../LinkURL";
import { Link } from "react-router-dom";

function Cart() {
  const [cartGames, setCartGames] = useState([]);
  const [addOneGames, setaddOneGames] = useState([]);
  const [deleteOneGames, setdeleteOneGames] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchGames() {
      try {
        const data = await fetchCartGames(userId, token);
        setCartGames(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cart games", err);
        setError(err);
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  async function addGame(gameId) {
    try {
      const data = await addGameToCart(userId, token, gameId);
      setaddOneGames(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart games", err);
      setError(err);
      setLoading(false);
    }
  }

  async function deleteGame(gameId) {
    try {
      const data = await removeGameFromCart(userId, token, gameId);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart games", err);
      setError(err);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="cart-container">
        <div className="smallerContainer-cart">
          <h1 className="title-cart">My Cart</h1>
          {cartGames.map((item) => {
            return (
              <div className="cart-box" key={item.id}>
                <div className="cartInfo-box">
                  <h3>{item.title}</h3>

                  <p>Price: ${item.price}</p>
                  <p>Quantity:{item.quantity}</p>
                  <div>
                    <button
                      onClick={() => deleteGame(item.id)}
                      id="removeOneBttn"
                    >
                      -
                    </button>
                    <button onClick={() => addGame(item.id)} id="addOneBttn">
                      +
                    </button>
                  </div>
                </div>
                <img
                  className="gameImage-cart"
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: "125px" }}
                />
              </div>
            );
          })}
          <div className="total-cost">
            <h3>Total Cost: </h3>
          </div>
          <Link to={`/account/success`}>
            <button id="checkoutBttn-cart">Checkout</button>
          </Link>
        </div>
        <Link to={`/store/`}>
          <button id="viewGameBttn">Back To All Games</button>
        </Link>
      </div>
    </>
  );
}

export default Cart;
