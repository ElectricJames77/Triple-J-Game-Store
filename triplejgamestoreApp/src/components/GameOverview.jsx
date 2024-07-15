import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GameOverview = () => {
    const [game, setGame] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    const API_URL = 'placeholder URL'                   //Remember to replace with database url

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
        getGameData()
    })
  return (
    <>
        {error ? (
            <h1>{error}</h1>
        ) : game ? (
            <>
                                                        {/* Design the page for a single game overview with possible recommendations forsimilar games and all game data */}
            </>
        ) : (
            <h1>Loading</h1>                            {/* Design the Loading screen */}
        )}
    </>
  )
}

export default GameOverview