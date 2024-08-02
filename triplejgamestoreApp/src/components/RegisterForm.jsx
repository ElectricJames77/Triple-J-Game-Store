import { useState } from "react";


export default function RegisterForm({setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault()

    try { 
        if (username.length < 8) {
            setError("Username must be at least 8 characters long.");
            return;
        }
        const response = await  fetch('', 
        { 
          method: "POST", 
          headers: {  "Content-Type": "application/json" }, 
          body: JSON.stringify({ 
            username: "some-username", 
            password: "super-secret-999" 
          }) 
        })
        const result = await response.json();
    
        console.log(result);
        setToken(result.token);
    } catch (error) {
        setError(error.message)
    }
  }
  return (
  <>
  <h2>Sign Up.</h2> 
  {error && <p>{error}</p>}

  <form onSubmit={handleSubmit}>
    <label>
      Username:
      <input 
      type="text"
      value={username} 
      onChange={(event) => setUsername(event.target.value)} />
    </label>
    <label>
      Password:
      <input 
      type='password'
      value={password} 
      onChange={(event) => setPassword(event.target.value)} />
    </label>
    <button>Submit</button>

  </form>
  </>
  );
}