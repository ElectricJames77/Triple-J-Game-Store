import "./Cart.css";
import { CartContext } from "../../../CartContext";
import { useContext, useEffect, useState } from "react";
import {
  fetchCartGames,
  addGameToCart,
  removeGameFromCart,
} from "../../../LinkURL";

function CartProduct() {
  const {
    cart,
    addOneToCart,
    removeOneFromCart,
    getTotalCost,
    deleteFromCart,
  } = useContext(CartContext);

  const [cartGames, setCartGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchGames(id) {
      try {
        const data = await fetchCartGames(id);
        setCartGames(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cart games", err);
        setError(err);
        setLoading(false);
      }
    }

    fetchGames(id);
  }, []);

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
                  <p>Quantity:${item.quantity}</p>
                  <div>
                    <button
                      onClick={() => removeOneFromCart(item.id)}
                      id="removeOneBttn"
                    >
                      -
                    </button>
                    <button
                      onClick={() => addOneToCart(item.id)}
                      id="addOneBttn"
                    >
                      +
                    </button>
                    {/* <button onClick={removeOneFromCart} id="removeOneBttn">
                      -
                    </button>
                    <button onClick={addOneToCart} id="addOneBttn">
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
          })}
          <div className="total-cost">
            <h3>Total Cost: ${getTotalCost()}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
