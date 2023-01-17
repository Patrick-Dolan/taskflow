import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRef } from "react";

const RegisterUser = () => {

  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        console.log(error)
        // ..
      });
  }
  
  return (
    <div>
      <h2>Register</h2>
      <form ref={form} onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" />
        <label>Password</label>
        <input type="password" name="password"/>
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}

export default RegisterUser;