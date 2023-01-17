import { UserAuth } from "../../Contexts/AuthContext";
import { useState } from "react";

const AccountOptions = () => {
  const { signIn, logout, passwordResetEmail } = UserAuth();
  const [email, setEmail] = useState("");
  const [passwordEmail, setPasswordEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e.message);
    }
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      await passwordResetEmail(passwordEmail);
      console.log("Password Reset Email Sent");
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div>
      <div>
        <h3>Sign in</h3>
        <form onSubmit={handleSignIn}>
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
      <div>
        <h3>Password Reset</h3>
        <form onSubmit={handlePasswordReset}>
          <label>Email</label>
          <input type="email" name="email" onChange={(e) => setPasswordEmail(e.target.value)} />
          <button type="submit">Send Reset Email</button>
        </form>
      </div>
    </div>
  )
}

export default AccountOptions;