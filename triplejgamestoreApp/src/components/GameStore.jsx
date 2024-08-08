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
    ? games.filter((game) => game.title.toLowerCase().includes(searchTerm))
    : games;

  return (
    <>
      <div>{searchTerm}</div>

      <div className="gameGroup">
        {gamesToDisplay.map((game) => {
          return (
            <div key={game.id}>
              <h3>{game.title}</h3>
              <img
                src={game.imageUrl}
                alt={game.title}
                style={{ width: "200px", height: "200px" }}
              />
              <li>
                <ul>Genre: {game.genre}</ul>
                <ul>Price: ${game.price}</ul>
                <ul>Rating: {game.totalRating}/100</ul>
                <ul># of ratings: {game.ratingsCount}</ul>
              </li>
              <Link to={`/games/${game.id}`}>
                <button>View Game</button>
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


