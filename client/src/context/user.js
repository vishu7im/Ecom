import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  useEffect(() => {
    if (Cookies.get("Auth")) {
      setuser(JSON.parse(Cookies.get("Auth")));
    } else {
      setuser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setuser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthApi = () => {
  return useContext(AuthContext);
};
