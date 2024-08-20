import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthHook from "../AuthHooks/AuthHook";
import { CartContext } from "../../CartContext";
import "./GameStore.css";
import { addGameToCart } from "../../LinkURL";

function GameStore({ searchTerm }) {
  const [games, setAllGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState("");
  const { isLoggedIn } = AuthHook();
  const { addOneToCart } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);

  const API_URL =
    "https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/games"; //Games URL

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

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

  async function addGame(gameId) {
    try {
      const data = await addGameToCart(userId, token, gameId);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart games", err);
      setError(err);
      setLoading(false);
    }
  }

  async function deleteGame(gameId) {
    try {
      const data = await removeOneFromCart(userId, token, gameId);
      setCartsetdeleteOneGames(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart games", err);
      setError(err);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="gamestore-container">
        <h1 className="headerTripleJ-store">Triple J</h1>
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

                <Link to={`/store/${game.id}`}>
                  <button id="viewGameBttn">View Game</button>
                </Link>

                {isLoggedIn && (
                  <button
                    onClick={() => {
                      addGame(game.id);
                    }}
                    className="addToCartBttn"
                  >
                    Add to Cart
                  </button>
                )}
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
