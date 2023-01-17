import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"
import { auth } from "../firebase"

export const UserContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});
  
  // !!! LEAVE FOLLOWING CONSOLE LOG IN BUT COMMENT OUT BEFORE PUSHING CODE !!!
  // console.log("Current User: ", user)

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

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
    return signOut(auth);
  }

  return (
    <UserContext.Provider value={{user, setUser, registerUser, signIn, logout}}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}