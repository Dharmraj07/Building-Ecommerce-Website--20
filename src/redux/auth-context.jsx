import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken=localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);

  };

  const logoutHandler = () => {
    setToken(null); // This will automatically make isLoggedIn false
    localStorage.removeItem("token");
    
  };

  const contextValue = {
    token: token,
    isLoggedIn: !!token, // Derived from token; no need to manually update
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
