import { createContext, useContext, useState, useEffect } from "react";

// Create the context (name should be PascalCase)
const UserContext = createContext();

// Context provider component
const UserDetails = ({ children }) => {
  const [isLoggedIN, setIsLoggedIn] = useState(false);
  async function logout() {
    try {
      const response = await fetch(
        "https://taskmaster-backend-vkjl.onrender.com/api/user/logout",
        {
          method: "GET",
          credentials: "include", // Needed for cookies
        }
      );

      if (!response.ok) {
        throw new Error("User  loggout failed ");
      }

      const data = await response.json(); // ✅ Parse JSON response

      setIsLoggedIn(false);
    } catch (error) {
      // console.log("Logout should be true");
      setIsLoggedIn(false);
    }
  }
  useEffect(() => {
    async function loginStatus() {
      try {
        const response = await fetch(
          "https://taskmaster-backend-vkjl.onrender.com/api/user/isloggedin",
          {
            method: "GET",
            credentials: "include", // Needed for cookies
          }
        );

        if (!response.ok) {
          throw new Error("User not logged in");
        }

        const data = await response.json(); // ✅ Parse JSON response
        console.log("Login check result:", data);
        setIsLoggedIn(true);
      } catch (error) {
        console.log("Logout should be true");
        setIsLoggedIn(false);
      }
    }

    loginStatus();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIN, setIsLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
const useDetails = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useDetails must be used within a UserDetails Provider");
  }
  return context;
};

export { useDetails, UserDetails };
