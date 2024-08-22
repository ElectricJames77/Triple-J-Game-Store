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
  const [account, setAccount] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAccount = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch account details");
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
  // console.log(accountData);

  useEffect(() => {
    // if (!account) return;

    async function fetchGames() {
      // console.log(account);
      if (!account.cart) {
        setLoading(false);
        return;
      }
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
  }, [account]);

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

  const totalCost = cartGames
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  // console.log(user);

  return (
    <>
      <div className="cart-container">
        <Link to={`/store/`}>
          <button id="viewGameBttn">Back To All Games</button>
        </Link>
        <br />
        <div className="smallerContainer-cart">
          <h1 className="title-cart">My Cart</h1>
          {cartGames.length === 0 ? (
            <h1 className="emptyCartText">Your Cart is Empty</h1>
          ) : (
            cartGames.map((item) => {
              return (
                <div className="cart-box" key={item.id}>
                  <div className="cartInfo-box">
                    <h3>{item.title}</h3>

                    <p>Price: ${item.price}</p>
                    <p>Quantity: 1</p>
                    <div>
                      <button
                        onClick={() => deleteGame(item.id)}
                        id="removeOneBttn"
                      >
                        Remove Game
                      </button>
                      {/* <button onClick={() => addGame(item.id)} id="addOneBttn">
                        +
                        </button> */}
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
            })
          )}

          {cartGames.length !== 0 ? (
            <>
              <div className="total-cost">
                <h3>Total Cost: ${totalCost} </h3>
              </div>
              <Link to={`/account/success`}>
                <button id="checkoutBttn-cart">Checkout</button>
              </Link>
            </>
          ) : null}
        </div>
        <br />
        <Link to={`/store/`}>
          <button id="viewGameBttn">Back To All Games</button>
        </Link>
      </div>
    </>
  );
}

export default Cart;
