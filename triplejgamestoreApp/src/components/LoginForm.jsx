import { useState } from "react";


export default function LoginForm({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "some-email",
          password: "super-secret-999",
        }),
      });
      const result = await response.json();

      console.log(result);
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      
      {error && <p>{error}</p>}

      <form id='logInForm' onSubmit={handleSubmit}>
        <h2>Sign In</h2><br />
        <label>
          Email: 
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label><br />
        <label>
          Password: 
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label><br />
        <button>Sign In</button>
      </form>
    </>
  );
}
