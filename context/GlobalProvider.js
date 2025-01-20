import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/appwrite"; // Adjust the import path as needed

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsLogged(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ 
        isLogged,
        setIsLogged,
        user,
        setUser,
        isLoading
       }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
