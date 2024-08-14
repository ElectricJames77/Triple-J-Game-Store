import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

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

  return (
    <>
      <div className="loginForm-container">
        {error && <p>{error}</p>}

        <form id="logInForm" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <br />
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <br />
          <button>Sign In</button>
          <br />
          <Link to={`/`}>
            <button id="goBackBttn">Go Back</button>
          </Link>
        </form>
      </div>
    </>
  );
}
