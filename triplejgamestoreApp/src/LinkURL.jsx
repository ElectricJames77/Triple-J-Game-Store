//Base URL:
//https://triplej-gamestore-2bf9fca17274.herokuapp.com/

//Games URL: (GET)
//https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/games

// async function getGameData() {
//   try {
//     const response = await fetch(`${API_URL}/games`);
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error("Game not found");
//     }
//     setAllGames(data);
//     setLoading(false);
//   } catch (error) {
//     setLoading(false);
//     setError(error.message);
//   }
// }
// getGameData();
//Games by ID URL: (GET)
//https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/games/id

//Login URL: (POST)
//https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/login

// const token = localStorage.getItem("token");
// const userId = localStorage.getItem("userId");

async function postLogin() {
  try {
    const response = await fetch(
      "https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Invalid credentials, Failed To Login");
    }
    const result = await response.json();
    console.log(result);
    if (result.accessToken) {
      setIsLoggedIn(true);
      localStorage.setItem("token", result.accessToken);
      navigate("/store");
    } else {
      throw new Error("Invalid credentials, Failed To Login");
    }
    // setToken(result.token);
  } catch (error) {
    setError(error.message);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }
}

//Register URL: (POST)
//https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/register

async function createUsername() {
  try {
    const response = await fetch(
      "https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          username,
          role,
        }),
      }
    );
    const result = await response.json();

    console.log(result);
    // setToken(result.token);
    if (result.id) {
      navigate("/account/login");
    }
  } catch (error) {
    setError(error.message);
  }
}

//View Users Cart URL: (GET)
//https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/cart/id

async function fetchCartGames(userId, token) {
  try {
    //this awaits the response from the API and pauses until it receives a response.
    const response = await fetch(
      `https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/cart/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching cart games: ${response.status} ${response.statusText}`
      );
    }
    //once received this takes the JSON data and extracts it
    const data = await response.json();
    //this returns the information from the JSON.
    return data;
    //if this didn't work, this error would prompt.
  } catch (err) {
    console.error("Uh oh, trouble fetching cart games!", err);
    return null;
  }
}

//Add Game to Cart URL: (POST)
//https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/cart

async function addGameToCart(userId, token, gameId) {
  try {
    // Awaits the response from the API to add the new player
    const response = await fetch(
      `https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gameId,
          userId: parseInt(userId),
        }),
      }
    );
    const data = await response.json();

    // Check if the player was successfully added
    console.log(data);
    if (data.gameId) {
      console.log("New game added successfully:", data.gameId);
    } else {
      console.error("Failed to add game!");
    }
  } catch (err) {
    console.error("Trouble adding game:", err);
  }
}

//Delete Game from Cart URL: (DELETE)
//https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/cart

async function removeGameFromCart(userId, token, gameId) {
  try {
    const response = await fetch(
      `https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/cart`,
      {
        //similar to POST, this DELETES based on the user request.
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          gameId,
        }),
      }
    );
    const data = await response.json();
    location.reload();
    return data;
  } catch (err) {
    console.error(`Whoops, trouble removing game #${Id} from the roster!`, err);
  }
}

export {
  // getGameData,
  postLogin,
  createUsername,
  fetchCartGames,
  addGameToCart,
  removeGameFromCart,
};
