import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GameOverview = () => {
    const [game, setGame] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    const API_URL = 'https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/games' //Games URL

    useEffect(() => {
        async function getGameData() {
            try {
                const response = await fetch(`${API_URL}/${id}`)
                const data = await response.json()
                if (!response.ok) {
                    throw new Error("Game not found")
                }
                setGame(data.data)
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
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            const data = await response.json();
            
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
            <div>
                <div>
                    <h2>{game?.title}</h2>
                    <p>{game?.genre}</p>
                    <p>{game?.description}</p>
                </div>
                
            </div>
            {/* Design the page for a single game overview with possible recommendations forsimilar games and all game data */}
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