import { UserAuth } from "../../Contexts/AuthContext";
import { useState } from "react";

const AccountOptions = () => {
  const { signIn, logout } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
    } catch (e) {
      setError(e.message);
      console.log("Sign in User Error: ", error);
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div>
      <div>
        <h3>Sign in</h3>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <h3>Logout</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default AccountOptions;