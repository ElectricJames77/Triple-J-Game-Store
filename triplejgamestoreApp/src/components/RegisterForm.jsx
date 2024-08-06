import { useState } from "react";
// import Select from "react-select";

export default function RegisterForm({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/register", {
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

      <form id="signUpForm" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <br />
        <label>
          Role:
          <select name="role" id="roleSelect">
            <option value="">--Please choose an option--</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            value={role}
            onChange={(event) => setRole(event.target.value)}
          </select>
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
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
        <button>Submit</button>
      </form>
    </>
  );
}
