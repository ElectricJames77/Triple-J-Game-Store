import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

function GameStore({ searchTerm }) {
    const [games, setAllGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const API_URL = 'https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/games' //Games URL

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
            <div>{searchTerm}</div>
        </>
    )
}
GameStore.propTypes = {
    searchTerm: PropTypes.string
  }
export default GameStore