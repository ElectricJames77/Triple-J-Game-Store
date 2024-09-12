import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthHook from "../AuthHooks/AuthHook";
import { CartContext } from "../../CartContext";
import "./GameStore.css";
import { addGameToCart } from "../../LinkURL";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function GameStore({ searchTerm }) {
  const [games, setAllGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gamesToShow, setGamesToShow] = useState(7);
  const navigate = useNavigate();
  const { isLoggedIn } = AuthHook();
  const { addOneToCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false); // For popup

  const API_URL = "https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/games";
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

  const sortedGames = [...games].sort((a, b) => b.totalRating - a.totalRating);
  const top1Game = sortedGames[0];
  const top2and3Games = sortedGames.slice(1, 3);
  const remainingGames = searchTerm ? sortedGames : sortedGames.slice(3, gamesToShow);
  const gamesToDisplay = searchTerm ? remainingGames.filter((game) => game.title.includes(searchTerm)) : remainingGames;

  async function addGame(gameId) {
    try {
      const data = await addGameToCart(userId, token, gameId);
      setIsOpen(true);
      setLoading(false);
    } catch (err) {
      console.error("Error adding game to cart", err);
      setError(err);
      setLoading(false);
    }
  }

  const showMoreGames = () => {
    setGamesToShow(gamesToShow + 7);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="gamestore-container">
        <h1 className="headerTripleJ-store">Triple J</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {top1Game && !searchTerm && (
          <div className="top1Game">
            <h2>Top #1 Game</h2>
            <div className="top1Singlur" key={top1Game.id}>
              <p className="num1">#1</p>
              <h3 className="top1GameTitle-store">{top1Game.title}</h3>
              <div className="top1GameImageContainer-store">
                <img
                  className="top1GameImage-store"
                  src={top1Game.imageUrl}
                  alt={top1Game.title}
                  style={{ width: "400px" }}
                />
              </div>
              <div className="top1GameInfo-store">
                Genre: {top1Game.genre}
                <br />
                Rating: {top1Game.totalRating}/100
                <br />
                Price: ${top1Game.price}
                <br />
              </div>
              <Link to={`/store/${top1Game.id}`}>
                <button id="viewGameBttn">View Game</button>
              </Link>
              {isLoggedIn && (
                <>
                  <button
                    onClick={async () => {
                      await addGame(top1Game.id);
                    }}
                    className="addToCartBttn"
                  >
                    Add to Cart
                  </button>
                  <Popup open={isOpen} onClose={handleClosePopup} >
                    <div
                      style={{
                        padding: "40px",
                        backgroundColor: "lightgrey",
                        borderRadius: "10px",
                        font: "Arial",
                        fontSize: "24px",
                        textAlign: "center",
                        border: "1px solid black",
                      }}
                    >
                      Game Added
                    </div>
                  </Popup>
                </>
              )}
            </div>
          </div>
        )}
        <br />
        {!searchTerm && (
          <div className="top2and3Games">
            <h2 className="top2and3Title active">Top 2 and 3 Games</h2>
            {top2and3Games.map((game) => (
              <div className="top2and3GameSinglur" key={game.id}>
                <h3 className="top2and3GameTitle-store">{game.title}</h3>
                <div className="top2and3GameImageContainer-store">
                  <img
                    className="top2and3GameImage-store"
                    src={game.imageUrl}
                    alt={game.title}
                    style={{ width: "300px" }}
                  />
                </div>
                <div className="top2and3GameInfo-store">
                  Genre: {game.genre}
                  <br />
                  Rating: {game.totalRating}/100
                  <br />
                  Price: ${game.price}
                  <br />
                </div>
                <Link to={`/store/${game.id}`}>
                  <button id="viewGameBttn">View Game</button>
                </Link>
                {isLoggedIn && (
                  <button
                    onClick={async () => await addGame(game.id)}
                    className="addToCartBttn"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <br />
        <div className="gameGroup">
          <h2 className="otherTitle active">Other Games</h2>
          {gamesToDisplay.map((game) => (
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
                Price: ${game.price}
                <br />
              </div>
              <Link to={`/store/${game.id}`}>
                <button id="viewGameBttn">View Game</button>
              </Link>
              {isLoggedIn && (
                <button
                  onClick={async () => await addGame(game.id)}
                  className="addToCartBttn"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
        {gamesToShow < games.length && (
          <button onClick={showMoreGames} className="showMoreBttn-store">
            Show More Games
          </button>
        )}
      </div>
    </>
  );
}

GameStore.propTypes = {
  searchTerm: PropTypes.string,
};

export default GameStore;
