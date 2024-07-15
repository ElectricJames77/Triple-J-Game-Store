import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const GameStore = () => {
    const [games, setAllGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const API_URL = 'placeholder URL'                   //Remember to replace with database url

    useEffect(() => {
        async function getGameData() {
            try {
                const response = await fetch(`${API_URL}`)
                const data = await response.json()
                if (!response.ok) {
                    throw new Error("Game not found")
                }
                setAllGames(data.data)
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
            
        </>
    )
}

export default GameStore