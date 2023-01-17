import { useState } from "react";
import { UserAuth } from "../../Contexts/AuthContext"

const RegisterUser = () => {
  const { registerUser } = UserAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(email, password);
    } catch (e) {
      setError(e.message);
      console.log("Register User Error: ", error);
    }
  }
  
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}

export default RegisterUser;