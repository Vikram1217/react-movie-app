import React, { createContext, useContext, useState, useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // our configured auth instance

// 1. create the context
const AuthContext = createContext();

// 2. Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
}

// 3. Create the provider component
export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // 4. Set up the firebase listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    // 5. Cleanup the listener on component unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  // 6. Provide the context value to the children
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}