import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function GameStore({ searchTerm }) {
  const [games, setAllGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState("");

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
      <div>{searchTerm}</div>

      <div className="gameGroup">
        {gamesToDisplay.map((game) => {
          return (
            <div className="gameSinglur" key={game.id}>
              <h3 className="">{game.title}</h3>
              <img
                className="gameImage"
                src={game.imageUrl}
                alt={game.title}
                style={{ width: "300px" }}
              />
              <div>
                Genre: {game.genre}
                <br />
                Rating: {game.totalRating}/100
                <br /># of ratings: {game.ratingsCount}
                <br />
                Price: ${game.price}
                <br />
              </div>
              {/* change the button to the section being clickable */}
              <Link to={`/store/${game.id}`}>
                <button id="viewGameBttn">View Game</button>
              </Link>
              <Link to={`/account/cart`}>
                <button id="addToCartBttn">Add to Cart</button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
GameStore.propTypes = {
  searchTerm: PropTypes.string,
};
export default GameStore;
