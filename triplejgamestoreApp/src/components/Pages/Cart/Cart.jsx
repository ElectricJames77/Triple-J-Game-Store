import "./Cart.css";
import { CartContext } from "../../../CartContext";
import { useContext, useEffect, useState } from "react";
import {
  fetchCartGames,
  addGameToCart,
  removeGameFromCart,
} from "../../../LinkURL";

const dummyData = [
  {
    id: 1,
    title: "Blood Strike",
    price: 60,
    description:
      "Charge into fast paced combat in modes such as Battle Royale, Squad Fight or Hot Zone alone or with friends. Blood Strike offers a id range of playable Strikers, each with a unique active and passive ability letting you deploy drones, shield walls and everything in between. Customize your weapons to your liking and get ready to prove that you have what it takes to come out on top!",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co7dqq.jpg",
    genre: "Shooter",
    totalRating: 100,
    ratingsCount: 6,
  },
  {
    id: 2,
    title: "Paper Mario: The Thousand-Year Door",
    price: 40,
    description:
      "A remake of the second game in the Paper Mario series, originally released for the Nintendo GameCube.\n\nTurn the page and join Mario and friends in an RPG adventure to disimageUrl the legendary treasure behind the ancient Thousand-Year Door. Will Mario complete his papery quest, or will he crumple under the pressure?",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co83vd.jpg",
    genre: "RPG",
    totalRating: 99,
    ratingsCount: 7,
  },
  {
    id: 3,
    title: "Outer Wilds: Archaeologist Edition",
    price: 60,
    description:
      "Outer Wilds: Archaeologist Edition contains Outer Wilds base game and Echoes of the Eye expansion.",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co3yjh.jpg",
    genre: "Adventure",
    totalRating: 99,
    ratingsCount: 8,
  },
];

function CartProduct() {
  const {
    cart,
    addOneToCart,
    removeOneFromCart,
    getTotalCost,
    deleteFromCart,
  } = useContext(CartContext);

  return (
    <>
      <div className="Cart-container">
        <h1>My Cart</h1>
        {dummyData.map((item) => {
          return (
            <div className="cart-box" key={item.id}>
              <div className="cartInfo-box">
                <h3>{item.title}</h3>

                <p>Price: ${item.price}</p>
                <p>Quantity:</p>
                <div>
                  <button onClick={removeOneFromCart} id="removeOneBttn">
                    -
                  </button>
                  <button onClick={addOneToCart} id="addOneBttn">
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
          <h3>Total Cost: ${getTotalCost()}</h3>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
