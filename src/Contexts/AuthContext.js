import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, updateEmail } from "firebase/auth"
import { auth } from "../firebase"

export const UserContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  
  console.log("Current User: ", user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const passwordResetEmail = async (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
    return signOut(auth);
  }

  const updateUserEmail = async (newEmail) => {
    return updateEmail(user, newEmail);
  }

  return (
    <UserContext.Provider value={{user, setUser, registerUser, passwordResetEmail, signIn, logout, updateUserEmail}}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}