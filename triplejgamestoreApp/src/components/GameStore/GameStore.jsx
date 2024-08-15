import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthHook from "../AuthHooks/AuthHook";
import { CartContext } from "../../CartContext";
import "./GameStore.css";

function GameStore({ searchTerm }) {
  const [games, setAllGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState("");
  const { isLoggedIn } = AuthHook();
  const { addOneToCart } = useContext(CartContext);

  const API_URL =
    "https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/games"; //Games URL

  useEffect(() => {
    async function getGameData() {
      try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Game not found");
        }
        setAllGames(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
    getGameData();
  }, []);

  const gamesToDisplay = searchTerm
    ? games.filter((game) => game.title.includes(searchTerm))
    : games;

  return (
    <>
      <h1>Triple J</h1>
      <div className="gamestore-container">
        {/* <div id="headerTripleJ-store"> */}
        {/* </div> */}
        <div>{searchTerm}</div>

        <div className="gameGroup">
          {gamesToDisplay.map((game) => {
            return (
              <div className="gameSinglur" key={game.id}>
                <h3 className="gameTitle-store">{game.title}</h3>
                <div className="gameImageContainer-store">
                  <img
                    className="gameImage-store"
                    src={game.imageUrl}
                    alt={game.title}
                    style={{ width: "200px" }}
                  />
                </div>
                <div className="gameInfo-store">
                  Genre: {game.genre}
                  <br />
                  Rating: {game.totalRating}/100
                  <br />
                  Number of ratings: {game.ratingsCount}
                  <br />
                  Price: ${game.price}
                  <br />
                </div>
                {/* change the button to the section being clickable */}

                <Link to={`/store/${game.id}`}>
                  <button id="viewGameBttn">View Game</button>
                </Link>

                <Link to={`/account/cart`}>
                  {isLoggedIn && (
                    <button onClick={addOneToCart} className="addToCartBttn">
                      Add to Cart
                    </button>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
GameStore.propTypes = {
  searchTerm: PropTypes.string,
};
export default GameStore;
