import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthHook  from "./AuthHooks/AuthHook";


const GameOverview = () => {
    const [game, setGame] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [message, setMessage] = useState(null);
    const { isLoggedIn } = AuthHook();
    const navigate = useNavigate();
    const API_URL = 'https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/games' //Games URL

    useEffect(() => {
        async function getGameData() {
            try {
                const response = await fetch(`${API_URL}/${id}`)
                const data = await response.json()
                if (!response.ok) {
                    throw new Error("Game not found")
                }
                setGame(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }
        }
        getGameData();
    }, [])

    const addToCart = async () => {
        try {
            const response = await fetch(`https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/cart`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            const data = await response.json();
            setMessage('Added to cart');
            console.log(data);
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
        {error ? (
            <h1>{error}</h1>
        ) : game ? (
            <>
            <div className="singleGameGroup">
                <div className="image-box">
                    <img src={game.imageUrl} alt={game.title} style={{ width: "200px", height: "200px"}} />
                    <h3>Game Name: {game?.title}</h3>
                    <li>
                        <ul>Genre: {game?.genre}</ul>
                        <ul>Price: ${game?.price}</ul>
                        <ul>Rating: {game.totalRating}</ul>
                        <ul># of Ratings: {game?.ratingsCount}</ul>
                    </li>
                    <p>Description: {game?.description}</p>
                    {isLoggedIn && <button onClick={addToCart} className="checkoutBtn">Add to Cart</button>}
                    {message && <h1 className="successMessage">{message}</h1>}
                    <Link to={`/store/`}>
                        <button>Back To All Games</button>
                    </Link>
                </div>
                
            </div>
            {/* Design the page for a single game overview with possible recommendations for similar games and all game data */}
            </>
        ) : (
            <div>
                {loading && <h1>Loading...</h1>}
            </div>                          
        )}
    </>
  )
}

export default GameOverview